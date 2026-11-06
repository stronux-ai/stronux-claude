# Stronux for Claude

A plugin for Claude Code and Claude Desktop that turns the files you already have into offers in your Stronux academy: courses, guides, services, bundles and space links.

- Claude reads your folder, shows you a plan and asks only what it cannot deduce.
- Everything is created as a draft. **Claude never deletes anything** and **only publishes when you say yes**.
- Claude does not generate content or images with AI: it organises and uploads what you already have.

## Install

```
/plugin marketplace add stronux-ai/stronux-claude
/plugin install stronux@stronux
```

Or from a terminal, which installs directly:

```
claude plugin marketplace add stronux-ai/stronux-claude
claude plugin install stronux@stronux
```

Full steps for Claude Code and Claude Desktop: [INSTALL.md](INSTALL.md).

The plugin currently points to Stronux staging for testing.

## New in 1.4.0

- **Several academies on one connection.** Claude starts with `whoami`, which lists your academies. If you have more than one, it asks in which to work (by name, never by id) and sends `space_id` in every call. If a call answers `space_choice_required`, `space_not_connected` or `space_mismatch`, Claude explains it and checks `whoami` again.
- **The community "seen" mark is its own step.** Reading never moves it. When Claude finishes reviewing everything new it calls `mark_community_seen` with the `mark_token` the read gave, and the app asks your permission.
- **Permission prompts.** Every tool that changes something now asks your permission in the app before it runs; the skills tell you once.
- The MCP now has 45 tools.

## Before, in 1.3.0

- `members` skill: invite people to your courses and to the team. Tools: `preview_member_invites`, `invite_members`, `describe_staff_roles`, `invite_staff`. Invitations send real emails, so Claude shows the list and asks for the yes first.
- `community` skill: see what is new in your communities, read a thread, and post or reply in the name of the owner. Tools: `list_community_activity`, `get_community_post`, `create_community_post`, `reply_in_community`. Posting and replying need your yes on the exact text.
- The MCP now has 44 tools and the plugin 9 skills. Claude still never deletes, hides or moderates anything.


## What is inside

| Path | What |
|---|---|
| `.claude-plugin/marketplace.json` | The `stronux` marketplace |
| `plugins/stronux/.mcp.json` | Connection to the Stronux MCP server |
| `plugins/stronux/skills/` | `setup-offers`, `course`, `guide`, `service`, `bundle`, `space-link`, `stats`, `members`, `community` |
| `tests/` | Checks run in CI with `claude plugin validate --strict` |

## Legal

[Privacy policy](https://stronux.com/privacy-policy) · [Terms of service](https://stronux.com/terms-of-service) · MIT, see [LICENSE](LICENSE).
