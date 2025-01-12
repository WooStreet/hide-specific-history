// import "./sw-omnibox.ts";
// import "./sw-tips.ts";
console.log("Service Worker Loaded");

chrome.webNavigation.onCompleted.addListener((details) => {
	// const fqdns: any = [];
	chrome.storage.sync.get((items: { sites: string[] }) => {
		const fqdns = items.sites;
		// const fqdns = ["https://www.nikkei.com"];
		if (fqdns.some((fqdn: string) => details.url.includes(fqdn))) {
			console.log("特定のURLにアクセスしました", details.url);
			// 履歴を削除
			historyDeleteUrl(details.url);
		}
	});
	// 特定のURLにアクセス
	console.log("アクセスしたurl", details.url);
});

// 履歴を削除する関数
function historyDeleteUrl(url: string) {
	chrome.history.deleteUrl({ url }, () => {
		console.log("Deleted");
	});
}
