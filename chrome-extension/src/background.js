chrome.browserAction.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, "FUCK_OFF_TWITTER!")
})