const url = chrome.extension.getURL("styles.css")
const cssPromise = fetch(url).then(r => r.text())

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.action == 'requestCSS') {
    cssPromise.then(css => {
      sendResponse({ action: 'sendCSS', data: css })
    })

    return true // returning true tells browser to expect async response
  }
})

chrome.webNavigation.onCommitted.addListener(function (o) {
  chrome.tabs.executeScript(o.tabId, {
    file: "content-script.js"
  });
});