import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const skillRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const checker = path.join(skillRoot, 'scripts', 'check-workflow-doc.mjs');
const artifactExamplePath = path.join(
  skillRoot,
  'examples',
  'create-and-share-decision-brief.json'
);
const artifactExample = JSON.parse(
  fs.readFileSync(artifactExamplePath, 'utf8')
);
const integrationDestinations = fs.readFileSync(
  path.join(skillRoot, 'references', 'integration-destinations.md'),
  'utf8'
);
const nodeRegistry = fs.readFileSync(
  path.join(skillRoot, 'references', 'node-registry.md'),
  'utf8'
);

function cloneArtifactExample() {
  return structuredClone(artifactExample);
}

function buildActionDocument(action) {
  return {
    schema_version: 'ds-v1',
    name: `Checker fixture for ${action.name}`,
    nodes: [
      {
        id: 'trigger',
        name: 'Manual trigger',
        type: 'ds.eventTrigger.perItem.in0.success1.error0',
        typeVersion: 1,
        mode: 'per_item',
        position: [0, 0],
        parameters: { event: 'MANUAL' },
      },
      {
        ...action,
        typeVersion: 1,
        mode: action.type.includes('.batch.') ? 'batch' : 'per_item',
        position: [320, 0],
      },
      {
        id: 'completed',
        name: 'Complete success',
        type: 'ds.sink.perItem.in1.success0.error0',
        typeVersion: 1,
        mode: 'per_item',
        position: [640, -80],
        parameters: {},
      },
      {
        id: 'failed',
        name: 'Stop failure',
        type: 'ds.sink.perItem.in1.success0.error0',
        typeVersion: 1,
        mode: 'per_item',
        position: [640, 80],
        parameters: {},
      },
    ],
    connections: {
      trigger: {
        success: [[{ node_id: action.id, index: 0 }]],
      },
      [action.id]: {
        success: [[{ node_id: 'completed', index: 0 }]],
        error: [[{ node_id: 'failed', index: 0 }]],
      },
    },
  };
}

function buildSlackDocument(
  type = 'ds.slackPublish.perItem.in1.success1.error1'
) {
  return buildActionDocument({
    id: 'publish-slack',
    name: 'Publish to Slack',
    type,
    parameters: {
      workspaceId: 'T_FAKE_REPLACE_ME',
      channelId: 'C_FAKE_REPLACE_ME',
      fallback: 'Workflow update: {{ trigger.systemEventType }}',
      source:
        '{\n  "blocks": [\n    {\n      "type": "section",\n      "text": {\n        "type": "plain_text",\n        "text": {{ trigger.systemEventType | json }}\n      }\n    }\n  ]\n}',
    },
  });
}

function buildTeamsDocument(
  type = 'ds.teamsPublish.perItem.in1.success1.error1'
) {
  return buildActionDocument({
    id: 'publish-teams',
    name: 'Publish to Teams',
    type,
    parameters: {
      tenantId: '00000000-0000-0000-0000-000000000001',
      teamId: '00000000-0000-0000-0000-000000000001',
      channelId: '19:FAKE_REPLACE_ME@thread.tacv2',
      bodyHtml:
        '<strong>Workflow update:</strong> {{ trigger.systemEventType | escape }}',
      cards:
        '[{"type":"AdaptiveCard","version":"1.5","body":[{"type":"TextBlock","text":{{ trigger.systemEventType | json }}}]}]',
      importance: 'normal',
    },
  });
}

function buildPdfDocument() {
  return buildActionDocument({
    id: 'create-pdf',
    name: 'Create PDF Artifact',
    type: 'ds.createPdfArtifact.batch.in1.success1.error1',
    parameters: {
      title: 'Portfolio brief for {{ items | size }} records',
      source:
        '<main>{% for item in items limit: 250 %}<p>{{ item | json | escape }}</p>{% endfor %}</main>',
    },
  });
}

function buildEmailDocument() {
  return buildActionDocument({
    id: 'send-email',
    name: 'Send Email',
    type: 'ds.emailPublish.batch.in1.success1.error1',
    parameters: {
      to: 'author.email',
      cc: '"json@example.com"',
      subject: 'Workflow digest for {{ items | size }} records',
      html:
        '<h1>Workflow digest</h1>{% for item in items limit: 250 %}<p>{{ item | json | escape }}</p>{% endfor %}',
      plaintext:
        'Workflow digest\n{% for item in items limit: 250 %}{{ item | json }}\n{% endfor %}',
      attachments: 'items',
    },
  });
}

function nodeById(document, id) {
  const node = document.nodes.find((candidate) => candidate.id === id);
  assert.ok(node, `missing fixture node ${id}`);
  return node;
}

function runChecker(document) {
  const tempRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), 'augment-workflow-check-')
  );
  const fixturePath = path.join(tempRoot, 'workflow.json');
  fs.writeFileSync(fixturePath, JSON.stringify(document));
  try {
    return spawnSync(process.execPath, [checker, fixturePath], {
      encoding: 'utf8',
    });
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

test('accepts the create, place, and email decision brief example', () => {
  const result = runChecker(artifactExample);
  assert.equal(result.status, 0, result.stderr);
});

test('accepts a focused Publish to Slack fixture with the json filter', () => {
  const result = runChecker(buildSlackDocument());
  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.stderr, /disallowed Liquid filter "json"/u);
});

test('accepts a focused Publish to Teams fixture', () => {
  const result = runChecker(buildTeamsDocument());
  assert.equal(result.status, 0, result.stderr);
});

test('accepts a batch Publish to Slack fixture', () => {
  const result = runChecker(
    buildSlackDocument('ds.slackPublish.batch.in1.success1.error1')
  );
  assert.equal(result.status, 0, result.stderr);
});

test('rejects the json root in a batch Liquid field', () => {
  const document = buildSlackDocument(
    'ds.slackPublish.batch.in1.success1.error1'
  );
  nodeById(document, 'publish-slack').parameters.fallback = '{{ json.value }}';
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /batch mode should reference items instead of json/u);
});

test('accepts a batch Create PDF Artifact fixture', () => {
  const result = runChecker(buildPdfDocument());
  assert.equal(result.status, 0, result.stderr);
});

test('accepts a batch Send Email fixture', () => {
  const result = runChecker(buildEmailDocument());
  assert.equal(result.status, 0, result.stderr);
});

test('rejects the json root in every batch Send Email CEL field', () => {
  for (const [field, value] of [
    ['to', 'json.recipients'],
    ['cc', 'json.cc'],
    ['bcc', 'json.bcc'],
    ['attachments', 'json'],
  ]) {
    const document = buildEmailDocument();
    nodeById(document, 'send-email').parameters[field] = value;
    const result = runChecker(document);
    assert.equal(result.status, 1, `${field}: ${result.stderr}`);
    assert.match(
      result.stderr,
      new RegExp(
        `${field}: batch mode should reference items instead of json`,
        'u'
      )
    );
  }
});

test('accepts a batch Publish to Teams fixture', () => {
  const result = runChecker(
    buildTeamsDocument('ds.teamsPublish.batch.in1.success1.error1')
  );
  assert.equal(result.status, 0, result.stderr);
});

test('rejects a fabricated Add Artifact to Decision Site batch type', () => {
  const document = cloneArtifactExample();
  const node = nodeById(document, 'place-artifact');
  node.type = 'ds.addArtifactToDecisionSite.batch.in1.success1.error1';
  node.mode = 'batch';
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /unknown public node type/u);
});

test('documents per-item retry isolation without changing batch retry scope', () => {
  assert.match(
    nodeRegistry,
    /next attempt invokes only unresolved\noriginal item indexes/u
  );
  assert.match(nodeRegistry, /Intermediate attempts\npublish no outputs/u);
  assert.match(
    nodeRegistry,
    /Batch nodes do not use per-item checkpoints: a retry invokes the whole batch\nagain/u
  );
});

test('documents mode-specific PDF attachment expressions', () => {
  assert.match(
    nodeRegistry,
    /attachments: "json"` in per-item mode\nor `attachments: "items"` in batch mode/u
  );
});

test('documents member-scoped Teams destination discovery', () => {
  assert.doesNotMatch(integrationDestinations, /workflowUri/u);
  assert.match(integrationDestinations, /owner\.memberUri/u);
  assert.equal(
    [...integrationDestinations.matchAll(/\{\?format,memberUri\}/gu)].length,
    6
  );
});

test('rejects the removed private Slack connection ID', () => {
  const document = buildSlackDocument();
  nodeById(document, 'publish-slack').parameters.connectionId = 999999;
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /connectionId: removed private parameter; use provider-native workspaceId/u
  );
});

test('rejects a numeric Slack workspace ID', () => {
  const document = buildSlackDocument();
  nodeById(document, 'publish-slack').parameters.workspaceId = 999999;
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /workspaceId: expected string/u);
});

test('rejects the removed private Teams configuration ID', () => {
  const document = buildTeamsDocument();
  nodeById(document, 'publish-teams').parameters.configurationId = 999999;
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(
    result.stderr,
    /configurationId: removed private parameter; use provider-native tenantId/u
  );
});

test('rejects a numeric Teams tenant ID', () => {
  const document = buildTeamsDocument();
  nodeById(document, 'publish-teams').parameters.tenantId = 999999;
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /tenantId: expected string/u);
});

test('rejects fixed Decision Site access with organization scope', () => {
  const document = cloneArtifactExample();
  nodeById(document, 'place-artifact').parameters.access = {
    visibility: 'RESTRICTED',
    scope: 'ORGANIZATION',
    groupIds: [201],
  };
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /fixed Decision Site target requires DECISION_SITE/u);
});

test('accepts dynamic Decision Site access with organization groups', () => {
  const document = cloneArtifactExample();
  nodeById(document, 'place-artifact').parameters = {
    decisionSiteId: 'trigger.dealRoomId',
    access: {
      visibility: 'RESTRICTED',
      scope: 'ORGANIZATION',
      groupIds: [201],
    },
  };
  const result = runChecker(document);
  assert.equal(result.status, 0, result.stderr);
});

test('rejects target-specific users on dynamic Decision Site access', () => {
  const document = cloneArtifactExample();
  nodeById(document, 'place-artifact').parameters = {
    decisionSiteId: 'trigger.dealRoomId',
    access: {
      visibility: 'RESTRICTED',
      scope: 'ORGANIZATION',
      groupIds: [201],
      userIds: [101],
    },
  };
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /unsupported keys userIds/u);
});

test('rejects malformed static Slack JSON', () => {
  const document = buildSlackDocument();
  nodeById(document, 'publish-slack').parameters.source = '{"blocks":';
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /static JSON is invalid/u);
});

test('rejects a blank PDF title', () => {
  const document = cloneArtifactExample();
  nodeById(document, 'create-pdf').parameters.title = '   ';
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /title: required template cannot be blank/u);
});

test('rejects an oversized static PDF body', () => {
  const document = cloneArtifactExample();
  nodeById(document, 'create-pdf').parameters.source = 'x'.repeat(262_145);
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /static PDF body exceeds 262144 UTF-8 bytes/u);
});

test('rejects an email subject with a line break', () => {
  const document = cloneArtifactExample();
  nodeById(document, 'send-email').parameters.subject = 'Line one\nLine two';
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /email subject cannot contain line breaks/u);
});

test('rejects an oversized static email subject', () => {
  const document = cloneArtifactExample();
  nodeById(document, 'send-email').parameters.subject = 'x'.repeat(201);
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /static email subject exceeds 200 characters/u);
});

test('rejects unsupported Adaptive Card actions', () => {
  const document = buildTeamsDocument();
  nodeById(document, 'publish-teams').parameters.cards = JSON.stringify([
    {
      type: 'AdaptiveCard',
      version: '1.5',
      actions: [{ type: 'Action.Submit', title: 'Send' }],
    },
  ]);
  const result = runChecker(document);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Action\.\* objects are not supported/u);
});

test('warns that authored node timeout is not enforced', () => {
  const document = buildSlackDocument();
  nodeById(document, 'publish-slack').timeout = 30_000;
  const result = runChecker(document);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /timeout is accepted.*not enforced/u);
});
