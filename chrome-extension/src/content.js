chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'FUCK_OFF_TWITTER!'){
        main();
    }
});