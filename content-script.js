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

// from wilmonium -- https://github.com/developerfromjokela/wilmonium/blob/main/js/wilmonium.js
async function refresh() {
  const res = await fetch(document.URL + "/overview")
  // session expired
  if (res.redirected) {
    window.location.reload()
    return
  }
  window.AutoLogoutWarning.tMinusLogout = window.autoLogoutDelay;
}
setInterval(refresh, 2 * 60 * 1000)