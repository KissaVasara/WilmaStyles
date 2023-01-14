chrome.runtime.sendMessage({ action: 'requestCSS' }, injectCSS)

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "updateCSS") {
    document.getElementById("WilmaStyles").textContent = msg.data
  }
})

function injectCSS(msg) {
  const style = document.createElement("style")
  style.id = "WilmaStyles"
  style.textContent = msg.data;
  (document.body || document.head || document.documentElement).appendChild(style);
  injectIframes();
}

function injectIframes() { /*run iframe.js so you can change themes while viewing a message */
  fetch("iframe.js")
    .then(response => response.text())
    .then(script => {
      eval(script);
    });
}

function refresh() {
  window.location.reload()
}
/*Refreshes the page every 20 minutes to prevent auto log off. My dumbass couldn't find a better way.*/
setInterval(refresh, 1200000)