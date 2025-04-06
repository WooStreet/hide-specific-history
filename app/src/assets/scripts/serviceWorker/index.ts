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

// メッセージを受け取って右クリックメニューを表示
chrome.runtime.onMessage.addListener((message) => {
	if (message.action === "showCustomMenu") {
    
		// 右クリックメニューを作成
		chrome.runtime.onInstalled.addListener(() => {
			chrome.contextMenus.create({
				type: "normal",
				id: "addSiteUrl",
				title: "サイトURLを追加",
				contexts: ["all"],
				// 拡張の設定ページでのみ表示
				documentUrlPatterns: [
					"chrome-extension://fgfmnkpgiinneonibbljphccacbngcpo/*",
				],
			});
		});
	}
	// 必ず undefined を返す
	return true; // または undefined
});

// 右クリックメニューがクリックされたときの処理
chrome.contextMenus.onClicked.addListener(() => {
	console.log("右クリックメニューがクリックされたときの処理");
});
