chrome.runtime.sendMessage({ action: 'requestCSS' }, injectCSS)

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "updateCSS") {
    document.getElementById("WilmaStyles").textContent = msg.data
    injectIframes()
  }
})

function injectCSS(msg) {
  const style = document.createElement("style")
  style.id = "WilmaStyles"
  style.textContent = msg.data;
  (document.body || document.head || document.documentElement).appendChild(style);
}

function injectIframes() {
  dispatchEvent(new Event("iframe_reinject"))
}

document.addEventListener('DOMContentLoaded', () => {
  // keep_session needs to access window.AutoLogoutWarning
  // which is not available in content script
  let script = document.createElement('script')
  script.src = chrome.extension.getURL('keep_session.js')
  script.defer = true
  document.body.appendChild(script)
})