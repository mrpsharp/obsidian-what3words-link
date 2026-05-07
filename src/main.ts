import { Plugin } from "obsidian";
import { registerInsertCommand } from "./commands/insert-link";
import { registerAutoformat } from "./autoformat";

export default class W3WLinkPlugin extends Plugin {
	async onload(): Promise<void> {
		registerInsertCommand(this);
		registerAutoformat(this);
	}
}
