import "../../css/style.css";
import "./list-url.ts";
import { getSites, removeListUrl } from "./list-url.ts";

function addSiteUrl(url: string): void {
	if (url) {
		chrome.storage.sync.get({ sites: [] }, (result) => {
			const sites: string[] = result.sites;
			if (!sites.includes(url)) {
				sites.push(url);
				chrome.storage.sync.set({ sites }, () => {
					console.log(`urlが追加されました: ${url}`);
					removeListUrl();
					getSites();
				});
			} else {
				alert("このurl名は既に存在します");
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
			window.location.reload();
		});
	}
});
