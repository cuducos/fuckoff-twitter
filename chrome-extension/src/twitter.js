const getBySelectorAndText = (selector, text) => {
  const matches = document.querySelectorAll(selector);
  for (let i = 0; i < matches.length; i++) {
    if (matches[i].innerText == text) return matches[i];
  }
};

const main = () => {
  // Are we at Twitter's homepage?
  if (window.location.href !== "https://twitter.com/home") return;

  // Is it set to Home?
  const home = getBySelectorAndText("h2>span[role=heading]", "Home");
  if (home !== undefined) return;

  // Let's open the menu to change it
  document.querySelector("div[aria-label='Top Tweets on']").click();

  // Let's get the link to change it to Latest tweets
  const bt = getBySelectorAndText("div>div>span", "See latest Tweets instead");
  if (bt === undefined) {
    console.error("Cannot find link to change to Latest tweets");
    return;
  }

  bt.click();
};