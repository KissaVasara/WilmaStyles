function getThemeUrl(name) {
  return chrome.extension.getURL(`themes/${name}.css`);
}

function fetchTheme(name) {
  return fetch(getThemeUrl(name)).then(r => r.text());
}

async function init() {
  let css = await fetchTheme("swag")

  chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.action == 'requestCSS') {
      sendResponse({ action: 'sendCSS', data: css })
    }
    if (msg.action == 'changeTheme') {
      console.log("changing theme to", msg.data)
      fetchTheme(msg.data).then(theme => css = theme)
      updateThemeInTabs(css)
    }
  })
}

async function updateThemeInTabs(css) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { action: "updateCSS", data: css })
    }
  })
}

chrome.webNavigation.onCommitted.addListener(function (o) {
  chrome.tabs.executeScript(o.tabId, {
    file: "content-script.js"
  });
});


init()