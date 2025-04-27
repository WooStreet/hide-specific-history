import "../../css/style.css";
import "./list-url.ts";
import { getSites, removeListUrl } from "./list-url.ts";

function addSiteUrl(url: string): void {
	if (url) {
		// urlの最後の/を削除
		const sanitizedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
		chrome.storage.sync.get({ sites: [] }, (result) => {
			const sites: string[] = result.sites;
			if (!sites.includes(sanitizedUrl)) {
				sites.push(sanitizedUrl);
				chrome.storage.sync.set({ sites }, () => {
					console.log(`urlが追加されました: ${sanitizedUrl}`);
					removeListUrl();
					getSites();
				});
			} else {
				alert("このURL名は既に存在します");
			}
		});
	} else {
		console.error("無効なURLです。");
	}
}
// 履歴を削除する関数
function historyDeleteUrl(url: string) {
	chrome.history.deleteUrl({ url }, () => {
		console.log("Deleted");
	});
}
// StartTimeを取得する関数
function getStartTime() {
	const now = new Date();
	// 5年前
	now.setFullYear(now.getFullYear() - 5);
	return now.getTime();
}
// リストのurlを取得
function getListUrl(): Promise<string[]> {
	return new Promise((resolve, reject) => {
		chrome.storage.sync.get({ sites: [] }, (result) => {
			if (chrome.runtime.lastError) {
				reject(new Error("Failed to retrieve sites from storage."));
			}
			const sites: string[] = result.sites;
			resolve(sites);
		});
	});
}
async function deleteAllSites(): Promise<void> {
	const list = await getListUrl();
	for (const url of list) {
		chrome.history.search(
			{
				text: url,
				// 10万件
				maxResults: 100000,
				startTime: getStartTime(),
			},
			(historyItems) => {
				console.log(historyItems);
				for (const item of historyItems) {
					if (item.url !== undefined) {
						historyDeleteUrl(item.url);
					}
				}
			},
		);
	}
	if (list.length > 0) {
		alert("リストの履歴を全て削除することができました");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// モーダルを開閉
	const openModalButton = document.getElementById("open-modal");
	const modal = document.getElementById("modal");
	const cancelButton = document.getElementById("cancel-button");
	const form = document.getElementById("add-site-form") as HTMLFormElement;
	// リストの履歴を全て削除するボタン
	const deleteAllHistoryButton = document.getElementById("delete-all-history");

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

		// リストの履歴を全て削除する
		if (deleteAllHistoryButton) {
			deleteAllHistoryButton.addEventListener("click", () => {
				console.log("deleteAllButton");
				deleteAllSites();
			});
		}
	}
});
