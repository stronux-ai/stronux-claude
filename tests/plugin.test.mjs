import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const plugin = join(root, 'plugins', 'stronux');
const skillsDir = join(plugin, 'skills');
const skills = readdirSync(skillsDir);

// The 45 tools of the Stronux MCP in stronux_repo main (apps/academy/src/backend/claude-connection/mcp-*.js). Update by hand when the MCP changes:
// that is the signal to review the skills.
const TOOLS = new Set([
  'whoami', 'list_offers', 'get_course_structure',
  'create_course', 'update_course', 'add_section', 'update_section', 'reorder_sections',
  'add_lesson', 'update_lesson_text', 'set_lesson_video_link', 'reorder_lessons',
  'create_lesson_video_upload', 'get_lesson_video_status',
  'prepare_material_upload', 'attach_material', 'set_course_cover', 'set_price',
  'create_guide', 'prepare_guide_upload', 'create_service', 'set_service_booking',
  'create_bundle', 'update_bundle_courses', 'update_offer', 'set_offer_cover',
  'publish_offer', 'show_lessons', 'create_space_link',
  'prepare_image_upload', 'set_section_cover',
  'get_academy_stats', 'list_member_changes', 'list_member_joins',
  'get_cover', 'set_cover_framing',
  'preview_member_invites', 'invite_members',
  'describe_staff_roles', 'invite_staff',
  'list_community_activity', 'mark_community_seen', 'get_community_post', 'create_community_post', 'reply_in_community',
]);

test('45 known tools', () => assert.equal(TOOLS.size, 45));

test('the nine skills exist', () => {
  assert.deepEqual([...skills].sort(), ['bundle', 'community', 'course', 'guide', 'members', 'service', 'setup-offers', 'space-link', 'stats']);
});

test('frontmatter has only name and description', () => {
  for (const s of skills) {
    const text = readFileSync(join(skillsDir, s, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n');
    const m = text.match(/^---\n([\s\S]*?)\n---\n/);
    assert.ok(m, `${s}: no frontmatter`);
    const keys = m[1].split('\n').filter((l) => /^[A-Za-z-]+:/.test(l)).map((l) => l.split(':')[0]);
    assert.deepEqual(keys, ['name', 'description'], s);
    assert.match(m[1], new RegExp(`^name: ${s}$`, 'm'));
  }
});

test('tool names in backticks exist', () => {
  const toolLike = /^(whoami|(?:create|add|update|set|get|list|prepare|attach|publish|show|reorder)_[a-z_]+|mark_community_seen)$/;
  for (const s of skills) {
    const text = readFileSync(join(skillsDir, s, 'SKILL.md'), 'utf8');
    for (const [, name] of text.matchAll(/`([a-z_]+)`/g)) {
      if (!toolLike.test(name) || name === 'publish_enabled' || name === 'set_password') continue; // publish_enabled is a whoami field; set_password is an email_sent value
      assert.ok(TOOLS.has(name), `${s}: unknown tool ${name}`);
    }
  }
});

test('skills carry the space_id rule; community marks with mark_token; no marked_read', () => {
  for (const s of skills) {
    const text = readFileSync(join(skillsDir, s, 'SKILL.md'), 'utf8');
    assert.ok(text.includes('space_id') || text.includes('setup-offers'), `${s}: no space_id rule`);
    assert.ok(!text.includes('marked_read'), `${s}: marked_read is gone`);
  }
  const community = readFileSync(join(skillsDir, 'community', 'SKILL.md'), 'utf8');
  assert.ok(community.includes('mark_community_seen') && community.includes('mark_token'));
  const setup = readFileSync(join(skillsDir, 'setup-offers', 'SKILL.md'), 'utf8');
  for (const e of ['space_choice_required', 'space_not_connected', 'space_mismatch']) assert.ok(setup.includes(e), e);
});

test('forbidden words', () => {
  for (const s of skills) {
    const text = readFileSync(join(skillsDir, s, 'SKILL.md'), 'utf8');
    for (const w of ['delete_', 'remove_', 'unpublish', 'acceptOverage', 'isPublished', 'image_base64', 'base64']) {
      assert.ok(!text.includes(w), `${s}: contains ${w}`);
    }
  }
});

test('.mcp.json points to staging with the public client', () => {
  const mcp = JSON.parse(readFileSync(join(plugin, '.mcp.json'), 'utf8'));
  const srv = mcp.mcpServers.stronux;
  assert.equal(srv.type, 'http');
  assert.equal(srv.url, 'https://demo.stronux.com/api/mcp');
  assert.deepEqual(srv.oauth, { clientId: '2ur8s3rhp028e4hc8rp9e0r4rp', callbackPort: 47821 });
  assert.deepEqual(Object.keys(srv).sort(), ['oauth', 'type', 'url']);
});

test('plugin contains only plugin.json, .mcp.json and skills (D1)', () => {
  assert.deepEqual(readdirSync(plugin).sort(), ['.claude-plugin', '.mcp.json', 'skills']);
  for (const d of ['commands', 'agents', 'hooks', 'bin']) assert.ok(!existsSync(join(plugin, d)), d);
});

test('manifests', () => {
  const p = JSON.parse(readFileSync(join(plugin, '.claude-plugin', 'plugin.json'), 'utf8'));
  const m = JSON.parse(readFileSync(join(root, '.claude-plugin', 'marketplace.json'), 'utf8'));
  assert.equal(p.name, 'stronux');
  assert.equal(m.name, 'stronux');
  assert.equal(m.plugins[0].name, 'stronux');
  assert.equal(m.plugins[0].source, './plugins/stronux');
  assert.ok(!('version' in m.plugins[0]), 'version only in plugin.json');
});
