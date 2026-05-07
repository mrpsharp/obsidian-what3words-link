const W3W_RE = /^[a-z]+\.[a-z]+\.[a-z]+$/;
const W3W_URL_RE =
	/^https?:\/\/(?:what3words\.com|w3w\.co)\/([a-z]+\.[a-z]+\.[a-z]+)(?:[/?#].*)?$/i;
const W3W_SLASH_RE = /^\/\/\/([a-z]+\.[a-z]+\.[a-z]+)$/;

/**
 * Accept any of:
 *   filled.count.soap
 *   ///filled.count.soap
 *   https://what3words.com/filled.count.soap
 *   https://w3w.co/filled.count.soap
 *
 * Returns the bare three-word address (lowercase) or null if invalid.
 */
export function parseW3W(input: string): string | null {
	const s = input.trim().toLowerCase();

	const urlMatch = W3W_URL_RE.exec(s);
	if (urlMatch?.[1]) return urlMatch[1];

	const slashMatch = W3W_SLASH_RE.exec(s);
	if (slashMatch?.[1]) return slashMatch[1];

	if (W3W_RE.test(s)) return s;

	return null;
}

export function formatW3WLink(address: string): string {
	return `[///${address}](https://what3words.com/${address})`;
}
