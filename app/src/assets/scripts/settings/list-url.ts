// 設定したurlのリストを表示する
// const sites = ["https://www.nikkei.com/", "https://www.yahoo.co.jp/"];
console.log("listUrl");

// リスト要素を取得し、リスト要素に追加する関数
function htmlListUrlRendering(listUrl: string[]) {
	const listElement = document.getElementById("list-url"); // ここでリスト要素を取得
	if (!listElement) {
		return;
	}

	for (const url of listUrl) {
		const li = document.createElement("li");
		li.className = "text-slate-100";
		const div = document.createElement("div");
		div.className = "flex justify-between items-center";
		li.appendChild(div);
		const span = document.createElement("span");
		span.textContent = url;
		div.appendChild(span);
		const button = document.createElement("button");
		button.className = "hover:bg-slate-700 rounded-full p-2";
		button.dataset.url = url;
		button.addEventListener("click", function () {
			removeSite(this);
		});
		const img = document.createElement("img");
		img.src = "../../images/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg";
		img.alt = "Delete";
		button.appendChild(img);
		div.appendChild(button);
		listElement.appendChild(li); // リスト要素に追加
	}
}
// リスト要素の子要素を全て削除する関数
export function removeListUrl() {
	const element = document.getElementById("list-url");
	if (!element) {
		return;
	}
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

// htmlListUrlRendering(sites);
// ストレージからデータを取得
export function getSites() {
	chrome.storage.sync.get({ sites: [] }, (result) => {
		const sites: string[] = result.sites;
		htmlListUrlRendering(sites);
	});
}

// サイトを削除する関数を定義
function removeSite(button: HTMLButtonElement) {
	const url = button.dataset.url;
	if (!url) {
		return;
	}
	console.log("removeSite", url);
	chrome.storage.sync.get({ sites: [] }, (result) => {
		// 現在のサイトリストを取得
		let sites: string[] = result.sites;
		// sitesからurlを削除
		sites = sites.filter((site) => site !== url);
		chrome.storage.sync.set({ sites }, () => {
			console.log(`urlを削除しました: ${url}`);
			removeListUrl();
			getSites();
		});
	});
}

getSites();
