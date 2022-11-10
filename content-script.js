chrome.runtime.sendMessage({ action: 'requestCSS' }, injectCSS)

chrome.runtime.onMessage.addListener((msg) => {
  console.log("content script message", msg);
  if (msg.action === "updateCSS") {
    console.log("receive updateCSS message")
    updateCSS(msg)
  }
})

function injectCSS(msg) {
  if (!document.getElementById("WilmaStyles")) {

    const injectedStyle = document.createElement('style');
    injectedStyle.id = "WilmaStyles";

    injectedStyle.textContent = msg.data;
    (document.body || document.head || document.documentElement).appendChild(injectedStyle);
  }
}

function updateCSS(msg) {
  console.log("update CSS");
  const injectedStyle = document.getElementById("WilmaStyles")
  injectedStyle.textContent = msg.data;
}

function refresh() {
  window.location.reload()
}
/*Refreshes the page every 20 minutes to prevent auto log off. My dumbass couldn't find a better way.*/
setInterval(refresh, 1200000)