console.log("setting/index.ts");

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("add-site-form") as HTMLFormElement;
	const siteUrlInput = document.getElementById("site-url") as HTMLInputElement;
	const errorDiv = document.getElementById("add-site-error") as HTMLDivElement;

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const siteUrl = siteUrlInput.value.trim();

		if (isValidUrl(siteUrl)) {
			addSiteUrl(siteUrl);
			siteUrlInput.value = "";
			errorDiv.textContent = "";
		} else {
			errorDiv.textContent = "有効なURLを入力してください。";
		}
	});
});

function isValidUrl(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch {
		return false;
	}
}

function extractDomain(url: string): string {
	try {
		const hostname = new URL(url).hostname;
		return hostname;
	} catch (error) {
		console.error("Invalid URL:", error);
		return "";
	}
}

function addSiteUrl(url: string): void {
	console.log("これを追加するです。", url);
	// https://www.youtube.com/
	// ドメインだけを取得する
	const domain = extractDomain(url);
	chrome.storage.sync.set({ sites: [domain] }, () => {
		console.log(`サイトドメイン名が追加されました: ${domain}`);
	});
	// chrome.storage.syncのデータを取得
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// chrome.storage.sync.get((items: any) => {
	// 	console.log(items.sites);
	// });
}
