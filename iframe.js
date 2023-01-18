const iframeCSS = `
html,body,.m-replybox {
  background-color: transparent !important; 
  color: white !important;
}
`

function injectStyle() {
  document.querySelectorAll("iframe").forEach(iframe => {
    const ws = document.getElementById("WilmaStyles")
    let brightness = getComputedStyle(ws).getPropertyValue("--brightness")

    let style = iframe.contentDocument.getElementById("Wilmastyles_iframecss")
    // remove old style
    style?.remove()

    if (brightness.includes("dark")) {
      style = iframe.contentDocument.createElement("style")
      style.id = "Wilmastyles_iframecss"
      style.innerHTML = iframeCSS;
      iframe.contentDocument.documentElement.appendChild(style)
    } else {
      console.log("theme does not have dark brightness")
    }
  });
}

window.addEventListener("iframe_reinject", injectStyle)

window.addEventListener("load", injectStyle);

