// import "./sw-omnibox.ts";
// import "./sw-tips.ts";
console.log("Service Worker Loaded");

chrome.history.deleteUrl({ url: "https://auctions.yahoo.co.jp/" }, () => {
	console.log("Deleted");
});

// chrome.browsingData.remove(
// 	{
// 		origins: ["https://auctions.yahoo.co.jp/"],
// 	},
// 	{
// 		cacheStorage: true,
// 		cookies: true,
// 		fileSystems: true,
// 		indexedDB: true,
// 		localStorage: true,
// 		serviceWorkers: true,
// 		webSQL: true,
// 	},
// 	() => {
// 		console.log("Deleted");
// 	},
// );

console.log("履歴を消しました。");
