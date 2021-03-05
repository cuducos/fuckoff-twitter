// ==UserScript==
// @name        Fuck-off, Twitter!
// @namespace   Violentmonkey Scripts
// @match       https://twitter.com/home
// @grant       none
// @version     1.0
// @author      Eduardo Cuducos - https://github.com/cuducos/fuckoff-twitter/blob/ec14293dda1467be71abb2549d2a36972e9e148f/twitter.js
// @description Always set Twitter's homepage to Latest tweets (chronological timeline)
// ==/UserScript==

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
  const menu = document.querySelector("div[aria-label='Top Tweets on']");
  if (menu === undefined) {
    console.error("Cannot find the menu to change to Latest tweets");
    return;
  }
  menu.click();

  // Let's get the link to change it to Latest tweets
  const bt = getBySelectorAndText("div>div>span", "See latest Tweets instead");
  if (bt === undefined) {
    console.error("Cannot find link to change to Latest tweets");
    return;
  }

  bt.click();
};

window.setTimeout(main, 5000);
