#!/usr/bin/env node

import fs from 'node:fs';

const EVENT_VALUES = new Set([
  'MEETING_START_MINUS_24H',
  'MEETING_START_MINUS_6H',
  'MEETING_START_MINUS_1H',
  'MEETING_START_MINUS_30M',
  'MEETING_START_MINUS_15M',
  'MEETING_START',
  'MEETING_START_MINUS_24H_FOR_DEAL_ROOM',
  'MEETING_START_MINUS_6H_FOR_DEAL_ROOM',
  'MEETING_START_MINUS_1H_FOR_DEAL_ROOM',
  'MEETING_START_MINUS_30M_FOR_DEAL_ROOM',
  'MEETING_START_MINUS_15M_FOR_DEAL_ROOM',
  'MEETING_START_FOR_DEAL_ROOM',
  'MEETING_ENDED',
  'MEETING_ENDED_FOR_DEAL_ROOM',
  'COMPANY_CHANGED',
  'DEAL_ROOM_CRM_STAGE_CHANGED',
  'DEAL_ROOM_STAGE_CHANGED',
  'MANUAL',
]);

const MODEL_TIERS = new Set(['low', 'medium', 'high']);
const AI_RETURN_TYPES = new Set([
  'string',
  'integer',
  'boolean',
  'float',
  'custom',
]);
const AI_AGENT_RETURN_TYPES = new Set([
  'string',
  'integer',
  'boolean',
  'float',
  'string_list',
  'integer_list',
  'boolean_list',
  'float_list',
  'custom',
]);
const MESSAGE_ROLES = new Set(['system', 'user', 'assistant', 'tool']);
const WAIT_UNITS = new Set([
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years',
]);
const BROADCAST_DIRECTIONS = new Set(['left', 'right']);
const SALESFORCE_PRIORITIES = new Set(['High', 'Normal', 'Low']);
const HUBSPOT_PRIORITIES = new Set(['HIGH', 'MEDIUM', 'LOW', 'NONE']);
const HUBSPOT_STATUSES = new Set([
  'NOT_STARTED',
  'IN_PROGRESS',
  'WAITING',
  'COMPLETED',
  'DEFERRED',
]);
const TEAMS_IMPORTANCE = new Set(['normal', 'important', 'urgent']);
const RETRY_STRATEGIES = new Set([
  'none',
  'fixed',
  'exponential',
  'exponential_jitter',
]);

const ALLOWED_LIQUID_TAGS = new Set([
  'if',
  'elsif',
  'else',
  'endif',
  'unless',
  'endunless',
  'case',
  'when',
  'endcase',
  'for',
  'endfor',
  'break',
  'continue',
  'cycle',
  'assign',
  'capture',
  'endcapture',
  'comment',
  'endcomment',
]);
const BANNED_PARTIAL_TAGS = new Set(['render', 'include', 'layout']);
const ALLOWED_LIQUID_FILTERS = new Set([
  'default',
  'escape',
  'escape_once',
  'downcase',
  'upcase',
  'slice',
  'truncate',
  'truncatewords',
  'join',
  'map',
  'sort',
  'sort_natural',
  'uniq',
  'replace',
  'replace_first',
  'replace_last',
  'append',
  'prepend',
  'remove',
  'remove_first',
  'strip',
  'strip_newlines',
  'strip_html',
  'newline_to_br',
  'capitalize',
  'split',
  'size',
  'first',
  'last',
  'compact',
  'concat',
  'reverse',
  'where',
  'plus',
  'minus',
  'times',
  'divided_by',
  'round',
  'ceil',
  'floor',
  'abs',
  'at_least',
  'at_most',
  'modulo',
  'date',
  'pluralize',
  'ordinal',
  'json',
  'elm_prompt',
]);
const LIQUID_ROOTS = new Set([
  'items',
  'json',
  'trigger',
  'author',
  'organization',
]);
const LIQUID_BUILTIN_LOCALS = new Set(['forloop']);
const BOUNDED_ITERABLE_ROOTS = new Set(['items']);
const RESERVED_PROPS = new Set(['__proto__', 'constructor', 'prototype']);
const MAX_FOR_LIMIT = 250;
const MAX_TRUNCATE_LEN = 1000;
const OUTPUT_SOFT_CAP = 50_000;
const MIN_SCHEDULE_INTERVAL_SECONDS = 14_400;
const SLACK_MAX_BLOCKS = 50;
const SLACK_MAX_FALLBACK_CHARACTERS = 4_000;
const PDF_MAX_TITLE_CODE_POINTS = 200;
const PDF_MAX_BODY_BYTES = 262_144;
const CUSTOM_OUTPUT_DRAFT7_URI = 'http://json-schema.org/draft-07/schema#';
const CUSTOM_OUTPUT_LIMITS = {
  serializedBytes: 65_536,
  documentDepth: 64,
  schemaDepth: 12,
  propertyCount: 100,
  schemaNodeCount: 256,
  enumEntryCount: 100,
};
const CUSTOM_OUTPUT_TYPES = new Set([
  'string',
  'integer',
  'number',
  'boolean',
  'object',
  'array',
]);
const CUSTOM_OUTPUT_COMMON_KEYS = new Set([
  'default',
  'description',
  'enum',
  'examples',
  'type',
]);
const CUSTOM_OUTPUT_OBJECT_KEYS = new Set([
  ...CUSTOM_OUTPUT_COMMON_KEYS,
  'additionalProperties',
  'properties',
  'required',
]);
const CUSTOM_OUTPUT_ARRAY_KEYS = new Set([
  ...CUSTOM_OUTPUT_COMMON_KEYS,
  'items',
]);

const literal = (valueType, options = {}) => ({
  kind: 'literal',
  valueType,
  ...options,
});
const cel = (resultType, options = {}) => ({
  kind: 'cel',
  resultType,
  ...options,
});
const liquid = (options = {}) => ({ kind: 'liquid', ...options });
const messages = () => ({ kind: 'messages' });
const labels = (length) => ({ kind: 'labels', length });
const optional = (descriptor) => ({ ...descriptor, optional: true });

const nodeSpecs = {
  'ds.eventTrigger.perItem.in0.success1.error0': {
    inputs: 0,
    success: 1,
    error: 0,
    params: { event: literal('string', { enum: EVENT_VALUES }) },
    trigger: true,
  },
  'ds.scheduledTrigger.perItem.in0.success1.error0': {
    inputs: 0,
    success: 1,
    error: 0,
    params: {
      cronExpression: literal('string'),
      timezone: literal('string'),
    },
    trigger: true,
    scheduled: true,
    cron: 'scheduled',
  },
  'ds.loadMeeting.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: { meeting_id: cel('string') },
  },
  'ds.loadValue.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      scope_id: cel('stringOrNumber'),
      key: literal('string'),
      default_value: optional(cel('json')),
    },
  },
  'ds.aiPrompt.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      model: literal('string', { enum: MODEL_TIERS }),
      messages: messages(),
      return_type: literal('string', { enum: AI_RETURN_TYPES }),
      value_schema: optional(literal('json')),
    },
  },
  'ds.aiPrompt.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      model: literal('string', { enum: MODEL_TIERS }),
      messages: messages(),
      return_type: literal('string', { enum: AI_RETURN_TYPES }),
      value_schema: optional(literal('json')),
    },
  },
  'ds.aiAgent.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      model: literal('string', { enum: MODEL_TIERS }),
      messages: messages(),
      return_type: literal('string', { enum: AI_AGENT_RETURN_TYPES }),
      value_schema: optional(literal('json')),
    },
  },
  'ds.aiAgent.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      model: literal('string', { enum: MODEL_TIERS }),
      messages: messages(),
      return_type: literal('string', { enum: AI_AGENT_RETURN_TYPES }),
      value_schema: optional(literal('json')),
    },
  },
  'ds.if.perItem.in1.success2.error0': {
    inputs: 1,
    success: 2,
    error: 0,
    params: { expr: cel('boolean') },
  },
  'ds.zip.batch.in2.success1.error0': {
    inputs: 2,
    success: 1,
    error: 0,
    params: { labels: labels(2) },
    zip: true,
  },
  'ds.zip.batch.in3.success1.error0': {
    inputs: 3,
    success: 1,
    error: 0,
    params: { labels: labels(3) },
    zip: true,
  },
  'ds.zip.batch.in4.success1.error0': {
    inputs: 4,
    success: 1,
    error: 0,
    params: { labels: labels(4) },
    zip: true,
  },
  'ds.broadcast.batch.in2.success1.error0': {
    inputs: 2,
    success: 1,
    error: 0,
    params: {
      broadcast: literal('string', { enum: BROADCAST_DIRECTIONS }),
      leftLabel: literal('string'),
      rightLabel: literal('string'),
    },
  },
  'ds.wait.perItem.in1.success1.error0': {
    inputs: 1,
    success: 1,
    error: 0,
    params: {
      amount: literal('number'),
      unit: literal('string', { enum: WAIT_UNITS }),
    },
  },
  'ds.waitUntil.perItem.in1.success1.error0': {
    inputs: 1,
    success: 1,
    error: 0,
    params: {
      cronExpression: literal('string'),
      timezone: literal('string'),
    },
    cron: 'waitUntil',
  },
  'ds.approval.perItem.in1.success2.error1': {
    inputs: 1,
    success: 2,
    error: 1,
    params: {
      prompt: liquid(),
      approverEmails: cel('stringOrStringArray'),
      timeoutDays: optional(literal('number')),
      approveLabel: optional(literal('string')),
      denyLabel: optional(literal('string')),
    },
    sideEffect: true,
  },
  'ds.approval.batch.in1.success2.error1': {
    inputs: 1,
    success: 2,
    error: 1,
    params: {
      prompt: liquid(),
      approverEmails: cel('stringOrStringArray'),
      timeoutDays: optional(literal('number')),
      approveLabel: optional(literal('string')),
      denyLabel: optional(literal('string')),
    },
    sideEffect: true,
  },
  'ds.slackPublish.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      workspaceId: literal('string'),
      channelId: literal('string'),
      source: liquid({ format: 'json' }),
      fallback: liquid({ format: 'plain' }),
    },
    sideEffect: true,
    actionContract: 'slackPublish',
  },
  'ds.slackPublish.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      workspaceId: literal('string'),
      channelId: literal('string'),
      source: liquid({ format: 'json' }),
      fallback: liquid({ format: 'plain' }),
    },
    sideEffect: true,
    actionContract: 'slackPublish',
  },
  'ds.createPdfArtifact.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      title: liquid({ format: 'plain' }),
      source: liquid({ format: 'html' }),
    },
    sideEffect: true,
    actionContract: 'createPdfArtifact',
  },
  'ds.createPdfArtifact.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      title: liquid({ format: 'plain' }),
      source: liquid({ format: 'html' }),
    },
    sideEffect: true,
    actionContract: 'createPdfArtifact',
  },
  'ds.addArtifactToDecisionSite.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      decisionSiteId: cel('number'),
      access: literal('json'),
    },
    sideEffect: true,
    actionContract: 'artifactPlacement',
  },
  'ds.emailPublish.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      to: cel('json'),
      cc: optional(cel('json')),
      bcc: optional(cel('json')),
      subject: liquid({ format: 'plain' }),
      html: liquid({ format: 'html' }),
      plaintext: liquid({ format: 'plain' }),
      attachments: optional(cel('json')),
    },
    sideEffect: true,
    actionContract: 'emailPublish',
  },
  'ds.emailPublish.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      to: cel('json'),
      cc: optional(cel('json')),
      bcc: optional(cel('json')),
      subject: liquid({ format: 'plain' }),
      html: liquid({ format: 'html' }),
      plaintext: liquid({ format: 'plain' }),
      attachments: optional(cel('json')),
    },
    sideEffect: true,
    actionContract: 'emailPublish',
  },
  'ds.teamsPublish.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      tenantId: literal('string'),
      teamId: literal('string'),
      channelId: literal('string'),
      bodyHtml: optional(liquid({ format: 'html' })),
      cards: optional(liquid({ format: 'json' })),
      importance: literal('string', { enum: TEAMS_IMPORTANCE }),
    },
    sideEffect: true,
    actionContract: 'teamsPublish',
  },
  'ds.teamsPublish.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      tenantId: literal('string'),
      teamId: literal('string'),
      channelId: literal('string'),
      bodyHtml: optional(liquid({ format: 'html' })),
      cards: optional(liquid({ format: 'json' })),
      importance: literal('string', { enum: TEAMS_IMPORTANCE }),
    },
    sideEffect: true,
    actionContract: 'teamsPublish',
  },
  'ds.slackPost.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: { channel: cel('string'), text: liquid() },
    sideEffect: true,
  },
  'ds.slackPost.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: { channel: cel('string'), text: liquid() },
    sideEffect: true,
  },
  'ds.teamsPost.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      teamId: cel('string'),
      channelId: cel('string'),
      text: liquid(),
    },
    sideEffect: true,
  },
  'ds.teamsPost.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      teamId: cel('string'),
      channelId: cel('string'),
      text: liquid(),
    },
    sideEffect: true,
  },
  'ds.emailSend.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      to: cel('stringOrStringArray'),
      subject: liquid(),
      body: liquid(),
    },
    sideEffect: true,
  },
  'ds.emailSend.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      to: cel('stringOrStringArray'),
      subject: liquid(),
      body: liquid(),
    },
    sideEffect: true,
  },
  'ds.smsSend.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: { to: cel('stringOrStringArray'), body: liquid() },
    sideEffect: true,
  },
  'ds.smsSend.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: { to: cel('stringOrStringArray'), body: liquid() },
    sideEffect: true,
  },
  'ds.notify.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      contact_email: cel('stringOrStringArray'),
      subject: liquid(),
      body: liquid(),
    },
    sideEffect: true,
  },
  'ds.notify.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      contact_email: cel('stringOrStringArray'),
      subject: liquid(),
      body: liquid(),
    },
    sideEffect: true,
  },
  'ds.crmUpdateOpportunity.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      deal_room_id: cel('number'),
      meeting_plan_id: cel('string'),
    },
    sideEffect: true,
  },
  'ds.createSalesforceTask.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      deal_room_id: cel('number'),
      title: liquid(),
      description: liquid(),
      due_date: optional(cel('string')),
      priority: optional(literal('string', { enum: SALESFORCE_PRIORITIES })),
    },
    sideEffect: true,
  },
  'ds.createSalesforceTask.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      deal_room_id: cel('number'),
      title: liquid(),
      description: liquid(),
      due_date: optional(cel('string')),
      priority: optional(literal('string', { enum: SALESFORCE_PRIORITIES })),
    },
    sideEffect: true,
  },
  'ds.createHubSpotTask.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      deal_room_id: cel('number'),
      title: liquid(),
      description: liquid(),
      due_at: optional(cel('string')),
      priority: optional(literal('string', { enum: HUBSPOT_PRIORITIES })),
      status: optional(literal('string', { enum: HUBSPOT_STATUSES })),
    },
    sideEffect: true,
  },
  'ds.createHubSpotTask.batch.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      deal_room_id: cel('number'),
      title: liquid(),
      description: liquid(),
      due_at: optional(cel('string')),
      priority: optional(literal('string', { enum: HUBSPOT_PRIORITIES })),
      status: optional(literal('string', { enum: HUBSPOT_STATUSES })),
    },
    sideEffect: true,
  },
  'ds.selectMany.perItem.in1.success1.error0': {
    inputs: 1,
    success: 1,
    error: 0,
    params: { items: cel('array'), label: optional(literal('string')) },
  },
  'ds.sink.perItem.in1.success0.error0': {
    inputs: 1,
    success: 0,
    error: 0,
    params: {},
  },
  'ds.storeValue.perItem.in1.success1.error1': {
    inputs: 1,
    success: 1,
    error: 1,
    params: {
      scope_id: cel('stringOrNumber'),
      key: literal('string'),
      value: cel('json'),
      retention_days: optional(literal('number', { positive: true })),
    },
    sideEffect: true,
  },
};

const sideEffectTypes = new Set(
  Object.entries(nodeSpecs)
    .filter(([, spec]) => spec.sideEffect)
    .map(([type]) => type)
);

function main() {
  const path = process.argv[2];
  if (!path) {
    console.error('Usage: node check-workflow-doc.mjs path/to/workflow.json');
    process.exit(2);
  }

  let parsed;
  try {
    const raw = fs.readFileSync(path, 'utf8');
    parsed = JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to read or parse ${path}: ${error.message}`);
    process.exit(2);
  }

  const document =
    parsed?.document && parsed.document.schema_version ? parsed.document : parsed;

  const issues = [];
  const warnings = [];

  checkEnvelope(document, issues);
  if (!document || typeof document !== 'object') {
    printResults(issues, warnings);
    process.exit(1);
  }

  const nodes = Array.isArray(document.nodes) ? document.nodes : [];
  const nodeById = new Map();

  for (const [index, node] of nodes.entries()) {
    if (!node || typeof node !== 'object' || Array.isArray(node)) {
      issues.push(`nodes[${index}]: node entry is not an object.`);
      continue;
    }
    if (typeof node.id !== 'string' || node.id.length === 0) {
      issues.push(`nodes[${index}]: every node must have a non-empty string id.`);
      continue;
    }
    if (nodeById.has(node.id)) {
      issues.push(`${node.id}: duplicate node id.`);
    }
    nodeById.set(node.id, node);
  }

  checkNodes(nodes, issues, warnings);
  checkTriggerCount(nodes, issues);
  checkConnections(document.connections, nodeById, issues);
  checkRuntimeTraps(nodes, document.connections, warnings, issues);

  printResults(issues, warnings);
  process.exit(issues.length > 0 ? 1 : 0);
}

function checkEnvelope(document, issues) {
  if (!document || typeof document !== 'object' || Array.isArray(document)) {
    issues.push('Document must be an object.');
    return;
  }
  if (document.schema_version !== 'ds-v1') {
    issues.push('Document schema_version must be "ds-v1".');
  }
  if (typeof document.name !== 'string' || document.name.trim().length === 0) {
    issues.push('Document name must be a non-empty string.');
  }
  if (!Array.isArray(document.nodes)) {
    issues.push('Document nodes must be an array.');
  }
  if (
    !document.connections ||
    typeof document.connections !== 'object' ||
    Array.isArray(document.connections)
  ) {
    issues.push('Document connections must be an object.');
  }
}

function checkNodes(nodes, issues, warnings) {
  const names = new Set();

  for (const [index, node] of nodes.entries()) {
    const label = node?.id ?? `nodes[${index}]`;
    const spec = nodeSpecs[node?.type];

    if (typeof node?.name !== 'string' || node.name.trim().length === 0) {
      issues.push(`${label}: node name is required.`);
    } else if (names.has(node.name)) {
      warnings.push(`${label}: duplicate node name "${node.name}".`);
    } else {
      names.add(node.name);
    }

    if (!spec) {
      issues.push(
        `${label}: unknown public node type ${JSON.stringify(node?.type)}.`
      );
      continue;
    }

    if (node.typeVersion !== 1) {
      warnings.push(`${label}: expected typeVersion 1.`);
    }

    checkNodeMode(label, node, issues);
    checkPosition(label, node, warnings, issues);
    checkRuntimeControls(label, node, issues, warnings);
    checkParams(label, node.type, node.parameters ?? {}, spec, issues, warnings);

    if (spec.cron === 'scheduled') {
      checkCronNode(
        label,
        node.parameters ?? {},
        'Scheduled triggers',
        issues,
        true
      );
    }
    if (spec.cron === 'waitUntil') {
      checkCronNode(label, node.parameters ?? {}, 'Wait Until nodes', issues, false);
    }
  }
}

function checkNodeMode(label, node, issues) {
  const expected = expectedNodeMode(node.type);
  if (node.mode === undefined || node.mode === null) {
    issues.push(`${label}: node mode is required (${expected}).`);
    return;
  }
  if (!['per_item', 'batch'].includes(node.mode)) {
    issues.push(`${label}: node mode must be "per_item" or "batch".`);
    return;
  }
  if (node.mode !== expected) {
    issues.push(`${label}: node mode ${JSON.stringify(node.mode)} does not match type variant ${expected}.`);
  }
}

function expectedNodeMode(type) {
  return type.includes('.batch.') ? 'batch' : 'per_item';
}

function checkPosition(label, node, warnings, issues) {
  if (node.position === undefined) {
    warnings.push(`${label}: position is missing; the builder expects [x, y] coordinates.`);
    return;
  }
  if (!Array.isArray(node.position) || node.position.length !== 2) {
    issues.push(`${label}: position must be an array of two numbers [x, y].`);
    return;
  }
  const [x, y] = node.position;
  if (
    typeof x !== 'number' ||
    typeof y !== 'number' ||
    !Number.isFinite(x) ||
    !Number.isFinite(y)
  ) {
    issues.push(`${label}: position coordinates must be finite numbers.`);
  }
}

function checkRuntimeControls(label, node, issues, warnings) {
  if (node.timeout !== undefined) {
    if (
      typeof node.timeout !== 'number' ||
      !Number.isFinite(node.timeout) ||
      node.timeout < 1
    ) {
      issues.push(`${label}: timeout must be a finite number >= 1 when present.`);
    } else {
      warnings.push(
        `${label}: node timeout is accepted by the document schema but is not enforced by the executor; remove it.`
      );
    }
  }

  if (node.retry !== undefined) {
    if (!node.retry || typeof node.retry !== 'object' || Array.isArray(node.retry)) {
      issues.push(`${label}: retry must be an object when present.`);
      return;
    }
    if (!RETRY_STRATEGIES.has(node.retry.strategy)) {
      issues.push(`${label}: retry.strategy must be one of ${Array.from(RETRY_STRATEGIES).join(', ')}.`);
    }
    if (
      typeof node.retry.max_attempts !== 'number' ||
      !Number.isFinite(node.retry.max_attempts) ||
      node.retry.max_attempts < 0
    ) {
      issues.push(`${label}: retry.max_attempts must be a finite number >= 0.`);
    }
    for (const field of ['backoff_ms', 'max_backoff_ms']) {
      if (
        node.retry[field] !== undefined &&
        (typeof node.retry[field] !== 'number' ||
          !Number.isFinite(node.retry[field]) ||
          node.retry[field] < 1)
      ) {
        issues.push(`${label}: retry.${field} must be a finite number >= 1 when present.`);
      }
    }
  }
}

function checkTriggerCount(nodes, issues) {
  const triggers = nodes.filter((node) => nodeSpecs[node?.type]?.trigger);
  if (triggers.length !== 1) {
    issues.push(`Expected exactly one trigger node, found ${triggers.length}.`);
  }
}

function checkParams(label, nodeType, params, spec, issues, warnings) {
  if (!params || typeof params !== 'object' || Array.isArray(params)) {
    issues.push(`${label}: parameters must be an object.`);
    return;
  }

  if (Object.hasOwn(params, '_executionMode')) {
    issues.push(
      `${label}._executionMode: execution variant comes from node.type; remove this parameter.`
    );
  }

  for (const [field, descriptor] of Object.entries(spec.params)) {
    const value = params[field];

    if (value === undefined || value === null) {
      if (!descriptor.optional) {
        issues.push(`${label}.${field}: missing required parameter.`);
      }
      continue;
    }

    checkParamValue(label, nodeType, field, value, descriptor, issues, warnings);
  }

  if (
    nodeType.startsWith('ds.aiPrompt.') ||
    nodeType.startsWith('ds.aiAgent.')
  ) {
    checkCustomOutputParameters(label, params, issues);
  }

  if (spec.actionContract) {
    checkActionContractParameters(
      label,
      spec.actionContract,
      params,
      issues,
      warnings
    );
  }

  for (const field of Object.keys(params)) {
    if (field === '_executionMode') continue;
    if (!spec.params[field]) {
      warnings.push(`${label}.${field}: parameter is not in the registry spec for this node.`);
    }
  }
}

function checkParamValue(label, nodeType, field, value, descriptor, issues, warnings) {
  if (descriptor.kind === 'literal') {
    checkLiteral(label, field, value, descriptor, issues);
    return;
  }
  if (descriptor.kind === 'cel') {
    checkCel(
      label,
      field,
      value,
      descriptor.resultType,
      expectedNodeMode(nodeType),
      issues,
      warnings
    );
    return;
  }
  if (descriptor.kind === 'liquid') {
    if (typeof value !== 'string') {
      issues.push(`${label}.${field}: Liquid parameters must be strings.`);
    } else {
      checkLiquid(
        label,
        field,
        value,
        expectedNodeMode(nodeType),
        issues,
        warnings,
        descriptor.format
      );
    }
    return;
  }
  if (descriptor.kind === 'messages') {
    checkMessages(label, nodeType, value, issues, warnings);
    return;
  }
  if (descriptor.kind === 'labels') {
    checkLabels(label, field, value, descriptor.length, issues, warnings);
  }
}

function checkLiteral(label, field, value, descriptor, issues) {
  if (descriptor.valueType === 'string') {
    if (typeof value !== 'string') {
      issues.push(`${label}.${field}: expected string.`);
      return;
    }
    if (!descriptor.optional && value.trim().length === 0) {
      issues.push(`${label}.${field}: required string cannot be empty.`);
      return;
    }
  }

  if (descriptor.valueType === 'number') {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      issues.push(`${label}.${field}: expected finite number.`);
      return;
    }
    if (descriptor.positive && value <= 0) {
      issues.push(`${label}.${field}: expected a positive number.`);
      return;
    }
    if (
      descriptor.positiveSafeInteger &&
      (!Number.isSafeInteger(value) || value <= 0)
    ) {
      issues.push(`${label}.${field}: expected a positive safe integer.`);
      return;
    }
  }

  if (descriptor.valueType === 'array' && !Array.isArray(value)) {
    issues.push(`${label}.${field}: expected array.`);
    return;
  }

  if (descriptor.valueType === 'json' && value === undefined) {
    issues.push(`${label}.${field}: expected a JSON value.`);
    return;
  }

  if (descriptor.enum && !descriptor.enum.has(value)) {
    issues.push(`${label}.${field}: unsupported value ${JSON.stringify(value)}.`);
  }
}

function checkActionContractParameters(
  label,
  contract,
  params,
  issues,
  warnings
) {
  if (contract === 'slackPublish') {
    rejectRemovedDestinationParameter(
      label,
      params,
      'connectionId',
      'workspaceId',
      issues
    );
    checkNonblankTemplates(label, params, ['source', 'fallback'], issues);
    if (
      typeof params.fallback === 'string' &&
      !hasLiquidSyntax(params.fallback) &&
      Array.from(params.fallback).length > SLACK_MAX_FALLBACK_CHARACTERS
    ) {
      issues.push(
        `${label}.fallback: static fallback exceeds ${SLACK_MAX_FALLBACK_CHARACTERS} characters.`
      );
    }
    const source = parseStaticJsonTemplate(label, 'source', params.source, issues);
    if (source !== undefined) {
      if (!isPlainObject(source) || !Array.isArray(source.blocks)) {
        issues.push(`${label}.source: static Slack JSON must be an object with a blocks array.`);
      } else if (source.blocks.length > SLACK_MAX_BLOCKS) {
        issues.push(`${label}.source: static Slack JSON exceeds ${SLACK_MAX_BLOCKS} blocks.`);
      }
    }
    return;
  }

  if (contract === 'createPdfArtifact') {
    checkNonblankTemplates(label, params, ['title', 'source'], issues);
    if (
      typeof params.title === 'string' &&
      !hasLiquidSyntax(params.title) &&
      Array.from(params.title.trim()).length > PDF_MAX_TITLE_CODE_POINTS
    ) {
      issues.push(
        `${label}.title: static title exceeds ${PDF_MAX_TITLE_CODE_POINTS} Unicode code points.`
      );
    }
    if (
      typeof params.source === 'string' &&
      !hasLiquidSyntax(params.source) &&
      utf8ByteLength(params.source) > PDF_MAX_BODY_BYTES
    ) {
      issues.push(
        `${label}.source: static PDF body exceeds ${PDF_MAX_BODY_BYTES} UTF-8 bytes.`
      );
    }
    return;
  }

  if (contract === 'artifactPlacement') {
    checkArtifactPlacementParameters(label, params, issues);
    return;
  }

  if (contract === 'emailPublish') {
    checkNonblankTemplates(
      label,
      params,
      ['subject', 'html', 'plaintext'],
      issues
    );
    if (typeof params.subject === 'string') {
      if (/\r|\n/u.test(params.subject)) {
        issues.push(`${label}.subject: email subject cannot contain line breaks.`);
      }
      if (
        !hasLiquidSyntax(params.subject) &&
        Array.from(params.subject).length > 200
      ) {
        issues.push(`${label}.subject: static email subject exceeds 200 characters.`);
      }
    }
    return;
  }

  if (contract === 'teamsPublish') {
    rejectRemovedDestinationParameter(
      label,
      params,
      'configurationId',
      'tenantId',
      issues
    );
    const hasBody =
      typeof params.bodyHtml === 'string' && params.bodyHtml.trim().length > 0;
    const hasCards =
      typeof params.cards === 'string' && params.cards.trim().length > 0;
    if (!hasBody && !hasCards) {
      issues.push(`${label}: Publish to Teams requires a nonblank bodyHtml, cards, or both.`);
    }
    if (typeof params.cards === 'string' && params.cards.trim().length > 0) {
      const cards = parseStaticJsonTemplate(label, 'cards', params.cards, issues);
      if (cards !== undefined) {
        if (!Array.isArray(cards) || cards.length === 0) {
          issues.push(`${label}.cards: static cards must be a non-empty JSON array.`);
        } else if (containsAdaptiveCardAction(cards)) {
          issues.push(`${label}.cards: Adaptive Card Action.* objects are not supported.`);
        }
      }
    }
    if (
      typeof params.bodyHtml === 'string' &&
      params.bodyHtml.trim().length === 0
    ) {
      warnings.push(`${label}.bodyHtml: blank optional body is clearer when omitted.`);
    }
    return;
  }
}

function rejectRemovedDestinationParameter(
  label,
  params,
  removed,
  replacement,
  issues
) {
  if (!Object.hasOwn(params, removed)) return;
  issues.push(
    `${label}.${removed}: removed private parameter; use provider-native ${replacement}.`
  );
}

function checkNonblankTemplates(label, params, fields, issues) {
  for (const field of fields) {
    if (typeof params[field] === 'string' && params[field].trim().length === 0) {
      issues.push(`${label}.${field}: required template cannot be blank.`);
    }
  }
}

function hasLiquidSyntax(value) {
  return typeof value === 'string' && (value.includes('{{') || value.includes('{%'));
}

function parseStaticJsonTemplate(label, field, value, issues) {
  if (typeof value !== 'string' || hasLiquidSyntax(value)) return undefined;
  try {
    return JSON.parse(value);
  } catch (error) {
    issues.push(`${label}.${field}: static JSON is invalid (${error.message}).`);
    return undefined;
  }
}

function containsAdaptiveCardAction(value) {
  if (Array.isArray(value)) return value.some(containsAdaptiveCardAction);
  if (!isPlainObject(value)) return false;
  if (typeof value.type === 'string' && value.type.startsWith('Action.')) {
    return true;
  }
  return Object.values(value).some(containsAdaptiveCardAction);
}

function checkArtifactPlacementParameters(label, params, issues) {
  const expression =
    typeof params.decisionSiteId === 'string'
      ? params.decisionSiteId.trim()
      : '';
  const fixedDecisionSiteId = readPositiveSafeIntegerLiteral(expression);
  if (/^-?\d+(?:\.\d+)?$/u.test(expression) && fixedDecisionSiteId === undefined) {
    issues.push(`${label}.decisionSiteId: numeric literal must be a positive safe integer.`);
  }

  const access = params.access;
  if (!isPlainObject(access)) {
    issues.push(`${label}.access: expected a closed access object.`);
    return;
  }
  if (access.visibility === 'EVERYONE') {
    checkExactObjectKeys(label, 'access', access, ['visibility'], issues);
    return;
  }
  if (access.visibility !== 'RESTRICTED') {
    issues.push(`${label}.access.visibility: expected "EVERYONE" or "RESTRICTED".`);
    return;
  }

  if (expression.length === 0) {
    return;
  }

  const fixed = fixedDecisionSiteId !== undefined;
  const expectedScope = fixed ? 'DECISION_SITE' : 'ORGANIZATION';
  if (access.scope !== expectedScope) {
    issues.push(
      `${label}.access.scope: ${fixed ? 'fixed' : 'dynamic'} Decision Site target requires ${expectedScope}.`
    );
  }

  if (fixed) {
    checkExactObjectKeys(
      label,
      'access',
      access,
      ['visibility', 'scope', 'userIds', 'groupIds'],
      issues
    );
    const usersValid = checkPositiveSafeIntegerArray(
      label,
      'access.userIds',
      access.userIds,
      issues
    );
    const groupsValid = checkPositiveSafeIntegerArray(
      label,
      'access.groupIds',
      access.groupIds,
      issues
    );
    if (
      usersValid &&
      groupsValid &&
      access.userIds.length === 0 &&
      access.groupIds.length === 0
    ) {
      issues.push(`${label}.access: restricted access needs at least one user or group.`);
    }
    return;
  }

  checkExactObjectKeys(
    label,
    'access',
    access,
    ['visibility', 'scope', 'groupIds'],
    issues
  );
  if (
    checkPositiveSafeIntegerArray(
      label,
      'access.groupIds',
      access.groupIds,
      issues
    ) &&
    access.groupIds.length === 0
  ) {
    issues.push(`${label}.access.groupIds: dynamic restricted access needs at least one organization group.`);
  }
}

function readPositiveSafeIntegerLiteral(value) {
  if (!/^[1-9]\d*$/u.test(value)) return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
}

function checkExactObjectKeys(label, field, value, allowedKeys, issues) {
  const allowed = new Set(allowedKeys);
  const extras = Object.keys(value).filter((key) => !allowed.has(key));
  if (extras.length > 0) {
    issues.push(`${label}.${field}: unsupported keys ${extras.join(', ')}.`);
  }
  for (const key of allowedKeys) {
    if (!Object.hasOwn(value, key)) {
      issues.push(`${label}.${field}.${key}: missing required field.`);
    }
  }
}

function checkPositiveSafeIntegerArray(label, field, value, issues) {
  if (!Array.isArray(value)) {
    issues.push(`${label}.${field}: expected an array.`);
    return false;
  }
  if (value.some((item) => !Number.isSafeInteger(item) || item <= 0)) {
    issues.push(`${label}.${field}: every id must be a positive safe integer.`);
    return false;
  }
  return true;
}

function utf8ByteLength(value) {
  return new TextEncoder().encode(value).byteLength;
}

function checkCustomOutputParameters(label, params, issues) {
  const hasSchema = Object.hasOwn(params, 'value_schema');
  if (params.return_type !== 'custom') {
    if (hasSchema) {
      issues.push(
        `${label}.value_schema: only allowed when return_type is "custom".`
      );
    }
    return;
  }
  if (!hasSchema) {
    issues.push(
      `${label}.value_schema: required when return_type is "custom".`
    );
    return;
  }
  checkCustomOutputSchema(label, params.value_schema, issues);
}

function checkCustomOutputSchema(label, schema, issues) {
  if (!isPlainObject(schema)) {
    issues.push(`${label}.value_schema: expected a JSON object.`);
    return;
  }
  if (schema.$schema !== CUSTOM_OUTPUT_DRAFT7_URI) {
    issues.push(
      `${label}.value_schema.$schema: must be ${JSON.stringify(CUSTOM_OUTPUT_DRAFT7_URI)}.`
    );
  }

  const serializedBytes = new TextEncoder().encode(JSON.stringify(schema)).byteLength;
  if (serializedBytes > CUSTOM_OUTPUT_LIMITS.serializedBytes) {
    issues.push(
      `${label}.value_schema: exceeds ${CUSTOM_OUTPUT_LIMITS.serializedBytes} serialized bytes.`
    );
    return;
  }

  const documentDepth = jsonDepth(schema);
  if (documentDepth > CUSTOM_OUTPUT_LIMITS.documentDepth) {
    issues.push(
      `${label}.value_schema: JSON depth ${documentDepth} exceeds ${CUSTOM_OUTPUT_LIMITS.documentDepth}.`
    );
    return;
  }

  const metrics = { propertyCount: 0, schemaNodeCount: 0 };
  checkCustomSchemaNode(label, schema, '#', 1, true, metrics, issues);
}

function checkCustomSchemaNode(
  label,
  schema,
  path,
  depth,
  isRoot,
  metrics,
  issues
) {
  if (!isPlainObject(schema)) {
    issues.push(`${label}.value_schema ${path}: schema node must be an object.`);
    return;
  }
  metrics.schemaNodeCount += 1;
  if (metrics.schemaNodeCount > CUSTOM_OUTPUT_LIMITS.schemaNodeCount) {
    issues.push(
      `${label}.value_schema: exceeds ${CUSTOM_OUTPUT_LIMITS.schemaNodeCount} schema nodes.`
    );
    return;
  }
  if (depth > CUSTOM_OUTPUT_LIMITS.schemaDepth) {
    issues.push(
      `${label}.value_schema ${path}: exceeds schema depth ${CUSTOM_OUTPUT_LIMITS.schemaDepth}.`
    );
    return;
  }

  const parsedType = parseCustomOutputType(schema.type);
  if (!parsedType) {
    issues.push(
      `${label}.value_schema ${path}/type: unsupported or noncanonical type.`
    );
    return;
  }
  if (isRoot && (parsedType.type !== 'object' || parsedType.nullable)) {
    issues.push(`${label}.value_schema: root must be a non-nullable object.`);
    return;
  }

  const allowedKeys =
    parsedType.type === 'object'
      ? CUSTOM_OUTPUT_OBJECT_KEYS
      : parsedType.type === 'array'
        ? CUSTOM_OUTPUT_ARRAY_KEYS
        : CUSTOM_OUTPUT_COMMON_KEYS;
  for (const key of Object.keys(schema)) {
    if (isRoot && key === '$schema') continue;
    if (!allowedKeys.has(key)) {
      issues.push(
        `${label}.value_schema ${path}/${escapeJsonPointer(key)}: unsupported keyword.`
      );
    }
  }

  if (
    Object.hasOwn(schema, 'description') &&
    typeof schema.description !== 'string'
  ) {
    issues.push(
      `${label}.value_schema ${path}/description: expected string.`
    );
  }
  if (
    Object.hasOwn(schema, 'examples') &&
    !Array.isArray(schema.examples)
  ) {
    issues.push(`${label}.value_schema ${path}/examples: expected array.`);
  }
  checkCustomEnum(label, schema.enum, parsedType, path, issues);
  if (
    Object.hasOwn(schema, 'default') &&
    !valueConformsToRawSchema(schema.default, schema)
  ) {
    issues.push(
      `${label}.value_schema ${path}/default: value does not match the schema.`
    );
  }
  if (Array.isArray(schema.examples)) {
    schema.examples.forEach((example, index) => {
      if (!valueConformsToRawSchema(example, schema)) {
        issues.push(
          `${label}.value_schema ${path}/examples/${index}: value does not match the schema.`
        );
      }
    });
  }

  if (parsedType.type === 'object') {
    if (!isPlainObject(schema.properties) || schema.additionalProperties !== false) {
      issues.push(
        `${label}.value_schema ${path}: objects require properties and additionalProperties false.`
      );
      return;
    }
    const propertyNames = Object.keys(schema.properties);
    metrics.propertyCount += propertyNames.length;
    if (metrics.propertyCount > CUSTOM_OUTPUT_LIMITS.propertyCount) {
      issues.push(
        `${label}.value_schema: exceeds ${CUSTOM_OUTPUT_LIMITS.propertyCount} declared properties.`
      );
      return;
    }
    const unsafe = propertyNames.find(
      (name) => RESERVED_PROPS.has(name) || !isUnicodeScalarValueString(name)
    );
    if (unsafe) {
      issues.push(
        `${label}.value_schema ${path}/properties/${escapeJsonPointer(unsafe)}: unsafe property name.`
      );
    }

    const required = schema.required ?? [];
    if (
      !Array.isArray(required) ||
      !required.every((name) => typeof name === 'string') ||
      new Set(required).size !== required.length ||
      required.some((name) => !Object.hasOwn(schema.properties, name))
    ) {
      issues.push(
        `${label}.value_schema ${path}/required: expected unique declared property names.`
      );
      return;
    }
    const requiredSet = new Set(required);
    for (const name of propertyNames) {
      const child = schema.properties[name];
      const childPath = `${path}/properties/${escapeJsonPointer(name)}`;
      const childType = isPlainObject(child)
        ? parseCustomOutputType(child.type)
        : undefined;
      if (!requiredSet.has(name) && childType && !childType.nullable) {
        issues.push(
          `${label}.value_schema ${childPath}: optional properties must be nullable.`
        );
      }
      checkCustomSchemaNode(
        label,
        child,
        childPath,
        depth + 1,
        false,
        metrics,
        issues
      );
    }
  } else if (parsedType.type === 'array') {
    if (!isPlainObject(schema.items)) {
      issues.push(`${label}.value_schema ${path}/items: expected one schema object.`);
      return;
    }
    checkCustomSchemaNode(
      label,
      schema.items,
      `${path}/items`,
      depth + 1,
      false,
      metrics,
      issues
    );
  }
}

function parseCustomOutputType(value) {
  if (typeof value === 'string' && CUSTOM_OUTPUT_TYPES.has(value)) {
    return { type: value, nullable: false };
  }
  if (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === 'string' &&
    CUSTOM_OUTPUT_TYPES.has(value[0]) &&
    value[1] === 'null'
  ) {
    return { type: value[0], nullable: true };
  }
  return undefined;
}

function checkCustomEnum(label, value, parsedType, path, issues) {
  if (value === undefined) return;
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.length > CUSTOM_OUTPUT_LIMITS.enumEntryCount ||
    new Set(value).size !== value.length
  ) {
    issues.push(`${label}.value_schema ${path}/enum: invalid enum.`);
    return;
  }
  if (['number', 'object', 'array'].includes(parsedType.type)) {
    issues.push(
      `${label}.value_schema ${path}/enum: enum is unsupported for ${parsedType.type}.`
    );
    return;
  }
  const hasNull = value.includes(null);
  const nonNull = value.filter((item) => item !== null);
  const matches = nonNull.every((item) => {
    if (parsedType.type === 'string') return typeof item === 'string';
    if (parsedType.type === 'boolean') return typeof item === 'boolean';
    return Number.isSafeInteger(item);
  });
  if (hasNull !== parsedType.nullable || nonNull.length === 0 || !matches) {
    issues.push(
      `${label}.value_schema ${path}/enum: values do not match the declared type.`
    );
  }
}

function valueConformsToRawSchema(value, schema) {
  const parsedType = parseCustomOutputType(schema.type);
  if (!parsedType) return false;
  if (value === null) {
    return (
      parsedType.nullable &&
      (schema.enum === undefined || schema.enum.includes(null))
    );
  }
  if (schema.enum !== undefined && !schema.enum.includes(value)) return false;

  if (parsedType.type === 'string') return typeof value === 'string';
  if (parsedType.type === 'integer') return Number.isSafeInteger(value);
  if (parsedType.type === 'number') {
    return typeof value === 'number' && Number.isFinite(value);
  }
  if (parsedType.type === 'boolean') return typeof value === 'boolean';
  if (parsedType.type === 'array') {
    return (
      Array.isArray(value) &&
      isPlainObject(schema.items) &&
      value.every((item) => valueConformsToRawSchema(item, schema.items))
    );
  }
  if (!isPlainObject(value) || !isPlainObject(schema.properties)) return false;
  const declared = new Set(Object.keys(schema.properties));
  if (Object.keys(value).some((key) => !declared.has(key))) return false;
  const required = Array.isArray(schema.required) ? schema.required : [];
  if (required.some((key) => !Object.hasOwn(value, key))) return false;
  return Object.entries(value).every(([key, item]) =>
    valueConformsToRawSchema(item, schema.properties[key])
  );
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function jsonDepth(value, depth = 1) {
  if (value === null || typeof value !== 'object') return depth - 1;
  const children = Array.isArray(value) ? value : Object.values(value);
  if (children.length === 0) return depth;
  return Math.max(...children.map((child) => jsonDepth(child, depth + 1)));
}

function escapeJsonPointer(value) {
  return value.replace(/~/gu, '~0').replace(/\//gu, '~1');
}

function isUnicodeScalarValueString(value) {
  for (let index = 0; index < value.length; index += 1) {
    const unit = value.charCodeAt(index);
    if (unit >= 0xd800 && unit <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (next < 0xdc00 || next > 0xdfff) return false;
      index += 1;
    } else if (unit >= 0xdc00 && unit <= 0xdfff) {
      return false;
    }
  }
  return true;
}

function checkMessages(label, nodeType, value, issues, warnings) {
  if (!Array.isArray(value) || value.length === 0) {
    issues.push(`${label}.messages: expected a non-empty messages array.`);
    return;
  }
  value.forEach((message, index) => {
    if (!message || typeof message !== 'object' || Array.isArray(message)) {
      issues.push(`${label}.messages[${index}]: expected object.`);
      return;
    }
    if (!MESSAGE_ROLES.has(message.role)) {
      issues.push(`${label}.messages[${index}].role: invalid role.`);
    }
    if (typeof message.content !== 'string') {
      issues.push(`${label}.messages[${index}].content: expected Liquid string.`);
    } else {
      if (message.content.trim().length === 0) {
        warnings.push(`${label}.messages[${index}].content: empty message content.`);
      }
      checkLiquid(
        label,
        `messages[${index}].content`,
        message.content,
        expectedNodeMode(nodeType),
        issues,
        warnings
      );
    }
  });
}

function checkLabels(label, field, value, expected, issues, warnings) {
  if (!Array.isArray(value) || value.length !== expected) {
    issues.push(`${label}.${field}: expected ${expected} labels.`);
    return;
  }
  value.forEach((item, index) => {
    if (typeof item !== 'string' || item.trim().length === 0) {
      issues.push(`${label}.${field}[${index}]: label must be a non-empty string.`);
    }
  });
  if (new Set(value).size !== value.length) {
    warnings.push(`${label}.${field}: duplicate labels make downstream Data Context confusing.`);
  }
  for (const item of value) {
    if (typeof item === 'string' && !/^[A-Za-z_][A-Za-z0-9_]*$/u.test(item)) {
      warnings.push(`${label}.${field}: label ${JSON.stringify(item)} is hard to reference; prefer identifier-like labels.`);
    }
  }
}

function checkConnections(connections, nodeById, issues) {
  const inbound = new Map();
  for (const [id, node] of nodeById.entries()) {
    const spec = nodeSpecs[node.type];
    inbound.set(id, Array.from({ length: spec?.inputs ?? 0 }, () => []));
  }

  for (const [sourceId, channels] of Object.entries(connections ?? {})) {
    const source = nodeById.get(sourceId);
    if (!source) {
      issues.push(`connections.${sourceId}: source node does not exist.`);
      continue;
    }
    if (!channels || typeof channels !== 'object' || Array.isArray(channels)) {
      issues.push(`connections.${sourceId}: connection entry must be an object.`);
      continue;
    }

    for (const key of Object.keys(channels)) {
      if (!['success', 'error'].includes(key)) {
        issues.push(`connections.${sourceId}.${key}: channel must be "success" or "error".`);
      }
    }

    const spec = nodeSpecs[source.type];
    if (!spec) continue;
    checkChannel(sourceId, 'success', channels.success, spec.success, nodeById, inbound, issues);
    checkChannel(sourceId, 'error', channels.error, spec.error, nodeById, inbound, issues);
  }

  for (const [nodeId, node] of nodeById.entries()) {
    const spec = nodeSpecs[node.type];
    if (!spec || spec.inputs === 0) continue;
    const ports = inbound.get(nodeId) ?? [];
    for (let index = 0; index < spec.inputs; index += 1) {
      if (!ports[index] || ports[index].length === 0) {
        issues.push(`${nodeId}: input port ${index} is not connected.`);
      }
    }

    const channelFamilies = new Set(ports.flat().map((edge) => edge.channel));
    if (channelFamilies.size > 1) {
      issues.push(`${nodeId}: incoming edges must all be from the same channel family (all success or all error).`);
    }
  }

  if (detectCycle(connections, nodeById)) {
    issues.push('Workflow graph must be acyclic.');
  }
}

function checkChannel(sourceId, channel, lists, maxPorts, nodeById, inbound, issues) {
  if (lists === undefined) return;
  if (!Array.isArray(lists)) {
    issues.push(`connections.${sourceId}.${channel}: must be an array.`);
    return;
  }
  if (lists.length > maxPorts) {
    issues.push(`connections.${sourceId}.${channel}: has ${lists.length} ports, node declares ${maxPorts}.`);
  }
  lists.forEach((edges, portIndex) => {
    if (portIndex >= maxPorts) {
      issues.push(`connections.${sourceId}.${channel}[${portIndex}]: source port out of bounds.`);
      return;
    }
    if (!Array.isArray(edges)) {
      issues.push(`connections.${sourceId}.${channel}[${portIndex}]: must be an edge array.`);
      return;
    }
    for (const [edgeIndex, edge] of edges.entries()) {
      if (!edge || typeof edge !== 'object' || Array.isArray(edge)) {
        issues.push(`connections.${sourceId}.${channel}[${portIndex}][${edgeIndex}]: edge must be an object.`);
        continue;
      }
      const dest = nodeById.get(edge.node_id);
      if (!dest) {
        issues.push(`connections.${sourceId}.${channel}[${portIndex}]: destination ${JSON.stringify(edge.node_id)} does not exist.`);
        continue;
      }
      const destSpec = nodeSpecs[dest.type];
      if (!destSpec) continue;
      if (!Number.isInteger(edge.index) || edge.index < 0 || edge.index >= destSpec.inputs) {
        issues.push(`connections.${sourceId}.${channel}[${portIndex}]: destination ${dest.id} input index ${edge.index} is invalid.`);
        continue;
      }
      inbound.get(dest.id)?.[edge.index]?.push({
        channel,
        sourceId,
        sourcePort: portIndex,
      });
    }
  });
}

function detectCycle(connections, nodeById) {
  const visiting = new Set();
  const visited = new Set();
  const adjacency = new Map();

  for (const id of nodeById.keys()) adjacency.set(id, []);
  for (const [sourceId, channels] of Object.entries(connections ?? {})) {
    if (!nodeById.has(sourceId)) continue;
    for (const channel of ['success', 'error']) {
      for (const edges of channels?.[channel] ?? []) {
        for (const edge of edges ?? []) {
          if (nodeById.has(edge?.node_id)) {
            adjacency.get(sourceId)?.push(edge.node_id);
          }
        }
      }
    }
  }

  function visit(nodeId) {
    if (visiting.has(nodeId)) return true;
    if (visited.has(nodeId)) return false;
    visiting.add(nodeId);
    for (const next of adjacency.get(nodeId) ?? []) {
      if (visit(next)) return true;
    }
    visiting.delete(nodeId);
    visited.add(nodeId);
    return false;
  }

  for (const nodeId of nodeById.keys()) {
    if (visit(nodeId)) return true;
  }
  return false;
}

function checkRuntimeTraps(nodes, connections, warnings, issues) {
  const scheduled = nodes.some((node) => nodeSpecs[node?.type]?.scheduled);
  const zipIds = new Set(nodes.filter((node) => nodeSpecs[node?.type]?.zip).map((node) => node.id));
  const downstreamOfZip = findImmediateDownstream(zipIds, connections);

  for (const node of nodes) {
    if (!node || typeof node !== 'object') continue;
    const values = collectStrings(node.parameters ?? {});
    for (const value of values) {
      if (scheduled && /(?:json\.meeting|trigger\.meetingPlanId|meetingPlanId)/u.test(value)) {
        warnings.push(`${node.id}: scheduled workflow references meeting context in ${JSON.stringify(value)}.`);
      }
      if (downstreamOfZip.has(node.id) && /json\.value/u.test(value)) {
        warnings.push(`${node.id}: node immediately downstream of zip references json.value; use zip labels instead.`);
      }
    }

    if (sideEffectTypes.has(node.type)) {
      warnings.push(`${node.id}: side-effecting node requires explicit user confirmation before release/trigger.`);
    }
  }

  for (const node of nodes) {
    if (node.type?.startsWith('ds.slackPost') && isBareCelIdentifier(node.parameters?.channel)) {
      issues.push(`${node.id}.channel: static Slack channel must be quoted as a CEL string literal.`);
    }
    if (node.type?.startsWith('ds.teamsPost')) {
      if (isBareCelIdentifier(node.parameters?.teamId)) {
        issues.push(`${node.id}.teamId: static Teams teamId must be quoted as a CEL string literal.`);
      }
      if (isBareCelIdentifier(node.parameters?.channelId)) {
        issues.push(`${node.id}.channelId: static Teams channelId must be quoted as a CEL string literal.`);
      }
    }
  }
}

function findImmediateDownstream(sourceIds, connections) {
  const result = new Set();
  for (const [sourceId, channels] of Object.entries(connections ?? {})) {
    if (!sourceIds.has(sourceId)) continue;
    for (const channel of ['success', 'error']) {
      for (const edges of channels?.[channel] ?? []) {
        for (const edge of edges ?? []) {
          if (edge?.node_id) result.add(edge.node_id);
        }
      }
    }
  }
  return result;
}

function checkLiquid(
  label,
  field,
  value,
  nodeMode,
  issues,
  warnings,
  format = 'markdown'
) {
  if (value.length > OUTPUT_SOFT_CAP) {
    warnings.push(`${label}.${field}: template length ${value.length} exceeds soft cap ${OUTPUT_SOFT_CAP}.`);
  }
  if (format === 'markdown' && /<[a-zA-Z][^>]*>/u.test(value)) {
    warnings.push(`${label}.${field}: Liquid-rendered message appears to contain raw HTML; use Markdown.`);
  }
  if (format === 'json') {
    checkJsonLiquidInsertions(label, field, value, warnings);
  }
  if (hasUnbalancedLiquidDelimiters(value)) {
    issues.push(`${label}.${field}: Liquid delimiters appear incomplete or unbalanced.`);
  }
  if (value.includes('$')) {
    issues.push(`${label}.${field}: Liquid does not support $variables; use json, items, trigger, author, or organization.`);
  }
  if (/\{\{[^}]*\{\{/u.test(value)) {
    issues.push(`${label}.${field}: nested Liquid output expressions are not allowed.`);
  }
  if (/\{\{[^}]*$/u.test(value)) {
    issues.push(`${label}.${field}: unclosed Liquid output expression.`);
  }
  const locals = collectLiquidLocals(value);
  checkLiquidTags(label, field, value, nodeMode, issues, warnings);
  checkLiquidFilters(label, field, value, issues, warnings);
  checkLiquidRoots(label, field, value, locals, nodeMode, issues);
  checkReservedProps(label, field, value, issues);
}

function hasUnbalancedLiquidDelimiters(value) {
  const opensOutput = (value.match(/\{\{/gu) ?? []).length;
  const closesOutput = (value.match(/\}\}/gu) ?? []).length;
  const opensTag = (value.match(/\{%/gu) ?? []).length;
  const closesTag = (value.match(/%\}/gu) ?? []).length;
  return opensOutput !== closesOutput || opensTag !== closesTag;
}

function checkJsonLiquidInsertions(label, field, value, warnings) {
  const outputRe = /\{\{([^}]*)\}\}/gu;
  for (const match of value.matchAll(outputRe)) {
    if (!/\|\s*json\b/u.test(match[1])) {
      warnings.push(
        `${label}.${field}: Liquid output inside JSON should usually use the json filter: ${JSON.stringify(match[0])}.`
      );
    }
  }
}

function collectLiquidLocals(value) {
  const locals = new Set();
  const tagRe = /\{%-?\s*([A-Za-z_][\w-]*)\b([^%}]*)-?%\}/gu;
  for (const match of value.matchAll(tagRe)) {
    const tag = match[1];
    const args = match[2] ?? '';
    if (tag === 'for') {
      const loopVar = /^\s*([A-Za-z_]\w*)\s+in\s+/u.exec(args)?.[1];
      if (loopVar) locals.add(loopVar);
    }
    if (tag === 'assign') {
      const target = /^\s*([A-Za-z_]\w*)\s*=/u.exec(args)?.[1];
      if (target) locals.add(target);
    }
    if (tag === 'capture') {
      const target = /^\s*([A-Za-z_]\w*)\s*$/u.exec(args.trim())?.[1];
      if (target) locals.add(target);
    }
  }
  return locals;
}

function checkLiquidTags(label, field, value, nodeMode, issues, warnings) {
  const tagRe = /\{%-?\s*([A-Za-z_][\w-]*)\b([^%}]*)-?%\}/gu;
  let depth = 0;
  let maxDepth = 0;

  for (const match of value.matchAll(tagRe)) {
    const tag = match[1];
    const args = match[2] ?? '';
    if (!ALLOWED_LIQUID_TAGS.has(tag)) {
      issues.push(`${label}.${field}: disallowed Liquid tag "${tag}".`);
    }
    if (BANNED_PARTIAL_TAGS.has(tag)) {
      issues.push(`${label}.${field}: Liquid partial tag "${tag}" is forbidden.`);
    }

    if (['if', 'unless', 'case', 'for', 'capture'].includes(tag)) {
      depth += 1;
      maxDepth = Math.max(maxDepth, depth);
    }
    if (['endif', 'endunless', 'endcase', 'endfor', 'endcapture'].includes(tag)) {
      depth = Math.max(0, depth - 1);
    }

    if (tag === 'for') {
      checkLiquidForTag(label, field, args, nodeMode, issues, warnings);
    }
    if (tag === 'assign' || tag === 'capture') {
      const target =
        tag === 'assign'
          ? /^\s*([A-Za-z_]\w*)\s*=/u.exec(args)?.[1]
          : /^\s*([A-Za-z_]\w*)\s*$/u.exec(args.trim())?.[1];
      if (
        target &&
        (LIQUID_ROOTS.has(target) || LIQUID_BUILTIN_LOCALS.has(target))
      ) {
        issues.push(
          `${label}.${field}: ${tag} cannot target reserved Liquid name "${target}".`
        );
      }
    }
  }

  if (maxDepth > 5) {
    warnings.push(`${label}.${field}: Liquid nesting depth ${maxDepth} exceeds 5.`);
  }
}

function checkLiquidForTag(label, field, args, nodeMode, issues, warnings) {
  const iterable = /^\s*\w+\s+in\s+([^\s,|%}]+)/u.exec(args)?.[1];
  const limitMatch = /\blimit\s*:\s*(-?\d+)/u.exec(args);
  const limit = limitMatch ? Number(limitMatch[1]) : undefined;

  if (isRangeLoop(iterable)) {
    warnings.push(`${label}.${field}: range loop detected; prefer iterating real data.`);
  } else if (iterable) {
    const root = iterable.split('.')[0];
    if (nodeMode === 'batch' && root === 'json') {
      issues.push(`${label}.${field}: batch mode should iterate items or ports instead of json.`);
    }
    if (!BOUNDED_ITERABLE_ROOTS.has(root) && limit === undefined) {
      issues.push(`${label}.${field}: unbounded loop over ${root} requires limit:N.`);
    }
  }

  if (limit !== undefined && limit > MAX_FOR_LIMIT) {
    issues.push(`${label}.${field}: for limit ${limit} exceeds max ${MAX_FOR_LIMIT}.`);
  }
  if (limit !== undefined && limit < 1) {
    issues.push(`${label}.${field}: for limit ${limit} must be positive.`);
  }
}

function isRangeLoop(iterable) {
  return typeof iterable === 'string' && /^\(\s*\d+\s*\.\.\s*\d+\s*\)$/u.test(iterable);
}

function checkLiquidFilters(label, field, value, issues, warnings) {
  const filterRe = /\|\s*([A-Za-z_]\w*)\s*(?::\s*([^|%}]*))?/gu;
  for (const match of value.matchAll(filterRe)) {
    const name = match[1];
    const argString = match[2] ?? '';
    if (!ALLOWED_LIQUID_FILTERS.has(name)) {
      issues.push(`${label}.${field}: disallowed Liquid filter "${name}".`);
    }
    if (name === 'truncate') {
      const numericArg = /(-?\d+)/u.exec(argString)?.[1];
      if (numericArg && Number(numericArg) > MAX_TRUNCATE_LEN) {
        warnings.push(`${label}.${field}: truncate length ${numericArg} exceeds ${MAX_TRUNCATE_LEN}.`);
      }
    }
  }
}

function checkLiquidRoots(label, field, value, locals, nodeMode, issues) {
  const expressionRe = /\{\{([^}]*)\}\}|\{%-?\s*(?:if|elsif|unless|when|assign)\b([^%}]*)-?%\}/gu;
  const reported = new Set();
  for (const match of value.matchAll(expressionRe)) {
    const expression = match[1] ?? match[2] ?? '';
    const leadingRoot = /^\s*([A-Za-z_]\w*)\b/u.exec(expression)?.[1];
    if (nodeMode === 'batch' && leadingRoot === 'json') {
      reportUnavailableBatchRoot(label, field, reported, issues);
    }
    if (
      leadingRoot &&
      !LIQUID_ROOTS.has(leadingRoot) &&
      !locals.has(leadingRoot) &&
      !LIQUID_BUILTIN_LOCALS.has(leadingRoot) &&
      !isLiquidKeywordOrLiteral(leadingRoot)
    ) {
      reportUnknownLiquidRoot(label, field, leadingRoot, reported, issues);
    }
    const rootRe = /(?:^|[^\w.])([A-Za-z_]\w*)\s*(?=\.|\[)/gu;
    for (const rootMatch of expression.matchAll(rootRe)) {
      const root = rootMatch[1];
      if (nodeMode === 'batch' && root === 'json') {
        reportUnavailableBatchRoot(label, field, reported, issues);
      }
      if (
        !LIQUID_ROOTS.has(root) &&
        !locals.has(root) &&
        !LIQUID_BUILTIN_LOCALS.has(root) &&
        !isLiquidKeywordOrLiteral(root)
      ) {
        reportUnknownLiquidRoot(label, field, root, reported, issues);
      }
    }
  }
}

function reportUnavailableBatchRoot(label, field, reported, issues) {
  if (reported.has('json')) return;
  reported.add('json');
  issues.push(`${label}.${field}: batch mode should reference items instead of json.`);
}

function reportUnknownLiquidRoot(label, field, root, reported, issues) {
  if (reported.has(root)) return;
  reported.add(root);
  if (root === 'ports') {
    issues.push(
      `${label}.${field}: Liquid root "ports" exists at runtime but is not accepted by the current server analyzer; use items or CEL ports.`
    );
    return;
  }
  issues.push(`${label}.${field}: unknown Liquid global root "${root}".`);
}

function isLiquidKeywordOrLiteral(value) {
  return [
    'true',
    'false',
    'nil',
    'null',
    'empty',
    'blank',
    'and',
    'or',
    'not',
  ].includes(value);
}

function checkReservedProps(label, field, value, issues) {
  for (const prop of RESERVED_PROPS) {
    const re = new RegExp(`(?:^|[.\\[])(?:${escapeRegExp(prop)})(?=\\]|\\.|\\b)`, 'u');
    if (re.test(value)) {
      issues.push(`${label}.${field}: reserved property "${prop}" is not allowed.`);
    }
  }
}

function checkCel(label, field, value, resultType, nodeMode, issues, warnings) {
  if (typeof value !== 'string') {
    issues.push(`${label}.${field}: CEL parameters must be strings.`);
    return;
  }
  if (value.trim().length === 0) {
    issues.push(`${label}.${field}: CEL expression cannot be empty.`);
    return;
  }
  if (/\{\{|\}\}|\{%|%\}/u.test(value)) {
    issues.push(`${label}.${field}: CEL field contains Liquid delimiters.`);
  }
  const leadingIdentifier = /^\s*([A-Za-z_]\w*)/u.exec(value)?.[1];
  if (nodeMode === 'batch' && leadingIdentifier === 'json') {
    issues.push(`${label}.${field}: batch mode should reference items instead of json.`);
  }
  if (!hasBalancedExpressionDelimiters(value)) {
    issues.push(`${label}.${field}: CEL expression has unbalanced quotes or brackets.`);
  }

  const literalType = detectCelLiteralType(value.trim());
  if (literalType && !isCelLiteralCompatible(literalType, resultType)) {
    issues.push(`${label}.${field}: CEL expression returns ${literalType}, expected ${resultType}.`);
  }

  if (resultType === 'boolean' && literalType === undefined && !looksBooleanCel(value)) {
    warnings.push(`${label}.${field}: expected CEL boolean expression; verify this returns true or false.`);
  }
  if (resultType === 'number' && literalType === undefined && isQuotedCelString(value)) {
    issues.push(`${label}.${field}: quoted string is not valid for CEL number result.`);
  }
  if (resultType === 'array' && literalType === undefined && !looksArrayCel(value)) {
    warnings.push(`${label}.${field}: expected CEL array expression; verify this returns a list.`);
  }
  if (resultType.startsWith('string') && isBareCelIdentifier(value)) {
    warnings.push(`${label}.${field}: bare CEL identifier; quote it if this is meant to be a static string.`);
  }
}

function detectCelLiteralType(value) {
  if (isQuotedCelString(value)) return 'string';
  if (/^(?:true|false)$/u.test(value)) return 'boolean';
  if (/^-?\d+(?:\.\d+)?$/u.test(value)) return 'number';
  if (/^\[/u.test(value)) return 'array';
  if (/^\{/u.test(value)) return 'object';
  return undefined;
}

function isCelLiteralCompatible(literalType, resultType) {
  if (resultType === 'json') return true;
  if (resultType === 'stringOrStringArray') {
    return literalType === 'string' || literalType === 'array';
  }
  if (resultType === 'stringOrNumber') {
    return literalType === 'string' || literalType === 'number';
  }
  return literalType === resultType;
}

function looksBooleanCel(value) {
  return /\b(?:==|!=|<=|>=|<|>|in|matches|startsWith|endsWith|contains|&&|\|\||true|false)\b/u.test(value);
}

function looksArrayCel(value) {
  return /^\s*\[/u.test(value) || /\b(?:items|ports)\b/u.test(value) || /\.map\s*\(/u.test(value);
}

function isQuotedCelString(value) {
  return /^"(?:[^"\\]|\\.)*"$/u.test(value) || /^'(?:[^'\\]|\\.)*'$/u.test(value);
}

function hasBalancedExpressionDelimiters(value) {
  let quote = null;
  let escape = false;
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const char of value) {
    if (escape) {
      escape = false;
      continue;
    }
    if (char === '\\') {
      escape = true;
      continue;
    }
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
      continue;
    }
    if (char === ')' || char === ']' || char === '}') {
      if (stack.pop() !== pairs[char]) return false;
    }
  }
  return quote === null && stack.length === 0;
}

function isBareCelIdentifier(value) {
  return typeof value === 'string' && /^[A-Za-z_][A-Za-z0-9_-]*$/u.test(value);
}

function checkCronNode(label, params, displayName, issues, enforceMinimumInterval) {
  const cronExpression =
    typeof params.cronExpression === 'string' ? params.cronExpression.trim() : '';
  const timezone = typeof params.timezone === 'string' ? params.timezone.trim() : '';

  if (cronExpression.length === 0) {
    issues.push(`${label}.cronExpression: ${displayName} require a cron expression.`);
    return;
  }
  if (timezone.length === 0) {
    issues.push(`${label}.timezone: ${displayName} require a timezone.`);
    return;
  }
  if (!isValidTimeZone(timezone)) {
    issues.push(`${label}.timezone: invalid IANA timezone ${JSON.stringify(timezone)}.`);
  }

  const cronError = validateSixFieldCron(cronExpression);
  if (cronError) {
    issues.push(`${label}.cronExpression: ${cronError}`);
    return;
  }

  if (enforceMinimumInterval) {
    const intervalSeconds = estimateMinimumCronIntervalSeconds(cronExpression);
    if (
      intervalSeconds !== null &&
      Number.isFinite(intervalSeconds) &&
      intervalSeconds > 0 &&
      intervalSeconds < MIN_SCHEDULE_INTERVAL_SECONDS
    ) {
      issues.push(`${label}.cronExpression: scheduled triggers must run at least every 4 hours.`);
    }
  }
}

function isValidTimeZone(timezone) {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(new Date());
    return true;
  } catch {
    return false;
  }
}

function validateSixFieldCron(expression) {
  const fields = expression.trim().split(/\s+/u);
  if (fields.length !== 6) {
    return `cron expression must have 6 fields; found ${fields.length}.`;
  }
  const ranges = [
    [0, 59, 'seconds'],
    [0, 59, 'minutes'],
    [0, 23, 'hours'],
    [1, 31, 'day of month'],
    [1, 12, 'month'],
    [0, 7, 'day of week'],
  ];
  for (let i = 0; i < fields.length; i += 1) {
    const [min, max, name] = ranges[i];
    const error = validateCronField(fields[i], min, max, name);
    if (error) return error;
  }
  return null;
}

function validateCronField(field, min, max, name) {
  if (field === '*') return null;
  const parts = field.split(',');
  for (const part of parts) {
    const [base, step] = part.split('/');
    if (step !== undefined && (!/^\d+$/u.test(step) || Number(step) < 1)) {
      return `invalid ${name} step ${JSON.stringify(step)}.`;
    }
    if (base === '*') continue;
    if (/^\d+$/u.test(base)) {
      const number = Number(base);
      if (number < min || number > max) {
        return `${name} value ${number} is out of range ${min}-${max}.`;
      }
      continue;
    }
    const range = /^(\d+)-(\d+)$/u.exec(base);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      if (start < min || start > max || end < min || end > max || start > end) {
        return `${name} range ${base} is invalid.`;
      }
      continue;
    }
    return `invalid ${name} field ${JSON.stringify(field)}.`;
  }
  return null;
}

function estimateMinimumCronIntervalSeconds(expression) {
  const [seconds, minutes, hours] = expression.trim().split(/\s+/u);
  const secondsStep = wildcardStep(seconds);
  if (secondsStep !== null) return secondsStep;
  const minutesStep = wildcardStep(minutes);
  if (minutesStep !== null) return minutesStep * 60;
  const hoursStep = wildcardStep(hours);
  if (hoursStep !== null) return hoursStep * 3600;
  if (hours === '*') return 3600;
  return null;
}

function wildcardStep(field) {
  if (field === '*') return 1;
  const match = /^\*\/(\d+)$/u.exec(field);
  return match ? Number(match[1]) : null;
}

function collectStrings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectStrings(item, out));
  else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => collectStrings(item, out));
  }
  return out;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function printResults(issues, warnings) {
  if (issues.length === 0 && warnings.length === 0) {
    console.log('Workflow document check passed.');
    return;
  }
  if (issues.length > 0) {
    console.error('Errors:');
    for (const issue of issues) console.error(`- ${issue}`);
  }
  if (warnings.length > 0) {
    console.error('Warnings:');
    for (const warning of warnings) console.error(`- ${warning}`);
  }
}

main();
