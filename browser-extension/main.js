const getBySelectorAndText = (selector, text) => {
  const matches = document.querySelectorAll(selector);
  for (const match of matches) {
    if (match.innerText == text) return match;
  }
};

let observer_state = 'FIND_BUTTON';

const observer = new MutationObserver(mutationList => {
  for (const mutation of mutationList) {
    const node = mutation.target;
    switch (observer_state) {
      case 'FIND_BUTTON':
        const menuButton = node.querySelector('div[aria-label^="Top Tweets"]')
        if (menuButton) {
          const ariaLabel = menuButton.attributes.getNamedItem('aria-label').value;
          if (ariaLabel.endsWith('on')) {
            menuButton.click();
            observer_state = 'FIND_LATEST_TWEETS';
          } else {
            observer_state = 'DONE';
          }
        }
        break;
      case 'FIND_LATEST_TWEETS':
        const latestTweetsButton = getBySelectorAndText('div>div>span', 'See latest Tweets instead');
        if (latestTweetsButton) {
          latestTweetsButton.click();
          observer_state = 'DONE';
        }
        break;
      case 'DONE':
        observer.disconnect();
        return;
      default:
        throw new Error(`Invalid state! ${observer_state}`);
    }
  }
})

observer.observe(document, { childList: true, subtree: true });
