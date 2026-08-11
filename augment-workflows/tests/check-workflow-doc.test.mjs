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
        mode: 'per_item',
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

function buildSlackDocument() {
  return buildActionDocument({
    id: 'publish-slack',
    name: 'Publish to Slack',
    type: 'ds.slackPublish.perItem.in1.success1.error1',
    parameters: {
      connectionId: 999999,
      channelId: 'C_FAKE_REPLACE_ME',
      fallback: 'Workflow update: {{ trigger.systemEventType }}',
      source:
        '{\n  "blocks": [\n    {\n      "type": "section",\n      "text": {\n        "type": "plain_text",\n        "text": {{ trigger.systemEventType | json }}\n      }\n    }\n  ]\n}',
    },
  });
}

function buildTeamsDocument() {
  return buildActionDocument({
    id: 'publish-teams',
    name: 'Publish to Teams',
    type: 'ds.teamsPublish.perItem.in1.success1.error1',
    parameters: {
      configurationId: 999999,
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
