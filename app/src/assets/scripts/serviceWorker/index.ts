chrome.webNavigation.onCompleted.addListener((details) => {
	// const fqdns: any = [];
	chrome.storage.sync.get((items: { sites: string[] }) => {
		const fqdns = items.sites;
		if (fqdns.some((fqdn: string) => details.url.includes(fqdn))) {
			// 履歴を削除
			historyDeleteUrl(details.url);
		}
	});
});

// 履歴を削除する関数
function historyDeleteUrl(url: string) {
	chrome.history.deleteUrl({ url }, () => {
		console.log("Deleted");
	});
}
