chrome.runtime.sendMessage({ action: 'requestCSS' }, injectCSS)

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "updateCSS") {
    document.getElementById("WilmaStyles").textContent = msg.data
  }
})

function newStyle(css) {
  const style = document.createElement("style")
  style.id = "WilmaStyles"
  style.textContent = css
  (document.body || document.head || document.documentElement).appendChild(style);
}

function injectCSS(msg) {
  if (!document.getElementById("WilmaStyles")) {
    newStyle(msg.data)
  }
}

function refresh() {
  window.location.reload()
}
/*Refreshes the page every 20 minutes to prevent auto log off. My dumbass couldn't find a better way.*/
setInterval(refresh, 1200000)