console.log("setting/index.ts");
import "../../css/style.css";

function addSiteUrl(url: string): void {
	if (url) {
		chrome.storage.sync.get({ sites: [] }, (result) => {
			const sites = result.sites as string[];
			if (!sites.includes(url)) {
				sites.push(url);
				chrome.storage.sync.set({ sites }, () => {
					console.log(`urlが追加されました: ${url}`);
				});
			} else {
				console.log(`このurl名は既に存在します: ${url}`);
			}
		});
	} else {
		console.error("無効なURLです。");
	}
}
// モーダルを開閉
document.addEventListener("DOMContentLoaded", () => {
	const openModalButton = document.getElementById("open-modal");
	const modal = document.getElementById("modal");
	const cancelButton = document.getElementById("cancel-button");
	const form = document.getElementById("add-site-form") as HTMLFormElement;

	// モーダルを開く
	if (openModalButton && modal && cancelButton) {
		openModalButton.addEventListener("click", () => {
			modal.classList.remove("hidden");
		});
		// モーダルを閉じる
		cancelButton.addEventListener("click", () => {
			modal.classList.add("hidden");
		});
		// モーダルの外側をクリックした場合は閉じる
		modal.addEventListener("click", (event) => {
			if (event.target === modal.children[0]) {
				modal.classList.add("hidden");
			}
		});
		// submitボタンを押した時の処理
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = new FormData(form);
			const siteUrlInput = formData.get("site-url") as string;
			addSiteUrl(siteUrlInput);
			modal.classList.add("hidden");
		});
	}
});
// ストレージのデータを取得する
// function getStorageData(): void {
// 	chrome.storage.sync.get((items: string[]) => {
// 		const sites = items.sites;
// 		console.log("sites", sites);
// 	});
// }
