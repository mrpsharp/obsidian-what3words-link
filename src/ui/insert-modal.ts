import { App, Modal, Setting } from "obsidian";
import { parseW3W, formatW3WLink } from "../utils/w3w";

export class InsertW3WModal extends Modal {
	private readonly onInsert: (link: string) => void;
	private inputEl!: HTMLInputElement;
	private errorEl!: HTMLElement;

	constructor(app: App, onInsert: (link: string) => void) {
		super(app);
		this.onInsert = onInsert;
	}

	onOpen(): void {
		const { contentEl } = this;
		contentEl.createEl("h2", { text: "Insert what3words link" });

		new Setting(contentEl).setName("Address").addText((text) => {
			this.inputEl = text.inputEl;
			text.setPlaceholder("filled.count.soap  ·  ///filled.count.soap  ·  URL");
			text.inputEl.style.width = "100%";
			text.inputEl.addEventListener("keydown", (e: KeyboardEvent) => {
				if (e.key === "Enter") {
					e.preventDefault();
					this.submit();
				}
			});
		});

		this.errorEl = contentEl.createEl("p");
		this.errorEl.style.color = "var(--text-error)";
		this.errorEl.style.margin = "0 0 12px";
		this.errorEl.style.minHeight = "1.4em";
		this.errorEl.style.fontSize = "var(--font-smaller)";

		const btnRow = contentEl.createDiv();
		btnRow.style.display = "flex";
		btnRow.style.justifyContent = "flex-end";
		btnRow.style.gap = "8px";

		btnRow
			.createEl("button", { text: "Cancel" })
			.addEventListener("click", () => this.close());

		const insertBtn = btnRow.createEl("button", { text: "Insert", cls: "mod-cta" });
		insertBtn.addEventListener("click", () => this.submit());

		// Defer focus so the modal is fully rendered first
		requestAnimationFrame(() => this.inputEl.focus());
	}

	private submit(): void {
		const address = parseW3W(this.inputEl.value);
		if (!address) {
			this.errorEl.textContent =
				"Please enter a valid what3words address (e.g. filled.count.soap)";
			return;
		}
		this.onInsert(formatW3WLink(address));
		this.close();
	}

	onClose(): void {
		this.contentEl.empty();
	}
}
