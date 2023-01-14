const iframeCSS = `
html,body {
  background-color: transparent !important; 
  color: white !important;
}`

window.addEventListener("load", function() { /*Wait for page to be loaded */
  document.querySelectorAll("iframe").forEach(iframe => {
    const ws = document.getElementById("WilmaStyles")
    let brightness = getComputedStyle(ws).getPropertyValue("--brightness")
    if (brightness.includes("dark")) {
      var style = iframe.contentDocument.createElement("style")
      iframe.setAttribute("allowTransparency", "true")
      style.innerHTML = iframeCSS;
      iframe.contentDocument.documentElement.appendChild(style)
    } else {
      console.log("theme does not have dark brightness")
    }
  });
});