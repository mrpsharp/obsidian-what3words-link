# what3words Link

An [Obsidian](https://obsidian.md) plugin that makes it easy to insert and format [what3words](https://what3words.com) addresses as clickable markdown links.

## Features

### Command palette — Insert what3words link

Open the command palette (`Ctrl/Cmd+P`) and run **Insert what3words link**. A modal appears with a text input. Type or paste a what3words address in any of these formats:

| Input | Accepted |
| --- | --- |
| `filled.count.soap` | ✓ |
| `///filled.count.soap` | ✓ |
| `https://what3words.com/filled.count.soap` | ✓ |
| `https://w3w.co/filled.count.soap` | ✓ |

Press **Enter** or click **Insert**. The plugin inserts a markdown link at the cursor:

```markdown
[///filled.count.soap](https://what3words.com/filled.count.soap)
```

If the input is not a valid three-word address, an inline error message is shown.

### Autoformat on typing

When you type `///word.word.word` followed by a space or punctuation (`space , ; : ! ?`), the bare address is automatically replaced with the formatted markdown link in place. The cursor lands correctly after the trigger character.

This only fires on the `///`-prefixed form to avoid false positives on ordinary `word.word.word` text. It does not trigger inside code fences or inline code spans.

## Installation

### Manual install

1. Download `main.js` and `manifest.json` from the [latest release](../../releases/latest).
2. Create the folder `<your-vault>/.obsidian/plugins/what3words-link/`.
3. Copy both files into that folder.
4. In Obsidian: **Settings → Community plugins → Installed plugins**, enable **what3words Link**.

### Via BRAT (Beta Reviewers Auto-update Tool)

1. Install the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin.
2. Open **Settings → BRAT → Add Beta plugin**.
3. Enter this repository URL and click **Add Plugin**.
4. Enable **what3words Link** in **Settings → Community plugins**.

## Development

```bash
# Install dependencies
npm install

# Watch mode (outputs main.js on every save)
npm run dev

# Production build
npm run build
```

To test locally, symlink or copy the plugin folder into your vault's `.obsidian/plugins/` directory and enable it. The [Hot Reload](https://github.com/pjeby/hot-reload) community plugin is supported — just keep `npm run dev` running.
