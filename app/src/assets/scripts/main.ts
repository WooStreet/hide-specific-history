import "../css/style.css";

const openSettingsButton = document.getElementById("open-settings");
if (openSettingsButton) {
	openSettingsButton.addEventListener("click", () => {
		chrome.tabs.create({ url: "pages/settings/index.html" });
	});
}
