import type { Editor } from "obsidian";
import type W3WLinkPlugin from "../main";
import { InsertW3WModal } from "../ui/insert-modal";

export function registerInsertCommand(plugin: W3WLinkPlugin): void {
	plugin.addCommand({
		id: "insert-what3words-link",
		name: "Insert what3words link",
		editorCallback: (editor: Editor) => {
			new InsertW3WModal(plugin.app, (link: string) => {
				editor.replaceSelection(link);
			}).open();
		},
	});
}
