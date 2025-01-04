// import "./sw-omnibox.ts";
// import "./sw-tips.ts";
console.log("Service Worker Loaded");

chrome.webNavigation.onCompleted.addListener(
	(details) => {
		// const fqdns: any = [];
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		chrome.storage.sync.get((items: any) => {
			const fqdns = items.sites;
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			if (fqdns.some((fqdn: any) => details.url.includes(fqdn))) {
				console.log("特定のURLにアクセスしました", details.url);
				// 履歴を削除
				historyDeleteUrl(details.url);
			}
		});
		// ["www.nikkei.com"]
		// 特定のURLにアクセス
		console.log("アクセスしたurl", details.url);
	},
	{ url: [{ urlMatches: "http://*/*" }, { urlMatches: "https://*/*" }] },
);

// 履歴を削除する関数
function historyDeleteUrl(url: string) {
	chrome.history.deleteUrl({ url }, () => {
		console.log("Deleted");
	});
}
