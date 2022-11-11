chrome.runtime.sendMessage({ action: 'requestCSS' }, injectCSS)

chrome.runtime.onMessage.addListener((msg) => {
  console.log("content script message", msg);
  if (msg.action === "updateCSS") {
    console.log("receive updateCSS message")
    window.location.reload()
  }
})

function newStyle(css) {
  const style = document.createElement("style")
  style.id = "WilmaStyles"
  style.textContent = css
  console.log(css);
  (document.body || document.head || document.documentElement).appendChild(style);
}

function injectCSS(msg) {
  if (!document.getElementById("WilmaStyles")) {
    console.log("inject CSS");
    newStyle(msg.data)
  }
}

function updateCSS(msg) {
  console.log("update CSS");
  document.getElementById("WilmaStyles").remove()
  newStyle(msg.data)
}

function refresh() {
  window.location.reload()
}
/*Refreshes the page every 20 minutes to prevent auto log off. My dumbass couldn't find a better way.*/
setInterval(refresh, 1200000)