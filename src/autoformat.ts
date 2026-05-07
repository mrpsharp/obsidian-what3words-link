import type { Editor, MarkdownFileInfo, MarkdownView } from "obsidian";
import type W3WLinkPlugin from "./main";
import { formatW3WLink } from "./utils/w3w";

// Matches ///word.word.word at the end of a string
const W3W_INLINE_RE = /\/\/\/([a-z]+\.[a-z]+\.[a-z]+)$/;

// Characters that trigger autoformat when typed immediately after a w3w address
const TRIGGER_RE = /[ ,;:!?]/;

// Prevents re-entry when our own replaceRange triggers editor-change
let isFormatting = false;

export function registerAutoformat(plugin: W3WLinkPlugin): void {
	plugin.registerEvent(
		plugin.app.workspace.on(
			"editor-change",
			(editor: Editor, _info: MarkdownView | MarkdownFileInfo) => {
				if (isFormatting) return;
				applyAutoformat(editor);
			}
		)
	);
}

function applyAutoformat(editor: Editor): void {
	const cursor = editor.getCursor();
	const line = editor.getLine(cursor.line);
	const textBefore = line.slice(0, cursor.ch);

	// Only fire on trigger characters
	const lastChar = textBefore[textBefore.length - 1];
	if (!lastChar || !TRIGGER_RE.test(lastChar)) return;

	// Look for ///word.word.word immediately before the trigger char
	const beforeTrigger = textBefore.slice(0, -1);
	const match = W3W_INLINE_RE.exec(beforeTrigger);
	if (!match) return;

	const address = match[1];
	if (!address) return;

	const matchStart = beforeTrigger.length - match[0].length;

	// Skip if inside a fenced code block or inline code span
	if (isInCodeFence(editor, cursor.line)) return;
	if (isInInlineCode(line, matchStart)) return;

	// Skip if the /// is immediately preceded by [ — already part of a link
	if (matchStart > 0 && line[matchStart - 1] === "[") return;

	const link = formatW3WLink(address);

	// replaceRange fires editor-change synchronously; the flag prevents re-entry.
	// CodeMirror maps the existing cursor (which is after the trigger char) through
	// the change, so cursor lands correctly after the trigger char with no setCursor needed.
	isFormatting = true;
	try {
		editor.replaceRange(
			link,
			{ line: cursor.line, ch: matchStart },
			{ line: cursor.line, ch: matchStart + match[0].length }
		);
	} finally {
		isFormatting = false;
	}
}

function isInCodeFence(editor: Editor, lineNum: number): boolean {
	let fenceCount = 0;
	const limit = Math.max(0, lineNum - 500);
	for (let i = limit; i < lineNum; i++) {
		if (/^(`{3,}|~{3,})/.test(editor.getLine(i))) fenceCount++;
	}
	return fenceCount % 2 !== 0;
}

function isInInlineCode(line: string, position: number): boolean {
	let ticks = 0;
	for (let i = 0; i < position; i++) {
		if (line[i] === "`") ticks++;
	}
	return ticks % 2 !== 0;
}
