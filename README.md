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

## What is inside

| Path | What |
|---|---|
| `.claude-plugin/marketplace.json` | The `stronux` marketplace |
| `plugins/stronux/.mcp.json` | Connection to the Stronux MCP server |
| `plugins/stronux/skills/` | `setup-offers`, `course`, `guide`, `service`, `bundle`, `space-link`, `stats` |
| `tests/` | Checks run in CI with `claude plugin validate --strict` |

## Legal

[Privacy policy](https://stronux.com/privacy-policy) · [Terms of service](https://stronux.com/terms-of-service) · MIT, see [LICENSE](LICENSE).
