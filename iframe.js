const iframeCSS = `
html,body {
  background-color: transparent !important; 
  color: white !important;
}`

document.querySelectorAll("iframe").forEach(iframe => {

  const ws = document.getElementById("WilmaStyles")
  let brightness =
    getComputedStyle(ws).getPropertyValue("--brightness")
  // lord forgive me for what i'm about to do
  // ^^why must you make me cry
    setTimeout(() => {
    if (brightness.includes("dark")) {
      var style = iframe.contentDocument.createElement("style")
      iframe.setAttribute("allowTransparency", "true")
      style.innerHTML = iframeCSS
      console.log(iframe.contentDocument.documentElement)

      iframe.contentDocument.documentElement.appendChild(style)
    } else {
      console.log("theme does not have dark brightness")
    }
  }, 500);
})