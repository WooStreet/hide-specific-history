console.log("sw-omnibox.js");

// Initialize default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === "install") {
		chrome.storage.local.set({
			apiSuggestions: ["tabs", "storage", "scripting"],
		});
	}
});

const URL_CHROME_EXTENSIONS_DOC =
	"https://developer.chrome.com/docs/extensions/reference/";
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

// Display the suggestions after user starts typing
chrome.omnibox.onInputChanged.addListener(async (_input, suggest) => {
	chrome.omnibox.setDefaultSuggestion({
		description: "Enter a Chrome API or choose from past searches",
	});
	const { apiSuggestions } = (await chrome.storage.local.get(
		"apiSuggestions",
	)) || { apiSuggestions: [] };
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const suggestions = apiSuggestions.map((api: any) => {
		return { content: api, description: `Open chrome.${api} API` };
	});
	suggest(suggestions);
});

// Open the reference page of the chosen API
chrome.omnibox.onInputEntered.addListener((input) => {
	chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
	// Save the latest keyword
	updateHistory(input);
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function updateHistory(input: any) {
	const { apiSuggestions } = (await chrome.storage.local.get(
		"apiSuggestions",
	)) || { apiSuggestions: [] };
	apiSuggestions.unshift(input);
	apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
	return chrome.storage.local.set({ apiSuggestions });
}
