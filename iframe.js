const iframeCSS = `
html,body {
  background-color: transparent !important; 
  color: white !important;
}
`

console.log("run inject");
document.querySelectorAll("iframe").forEach(iframe => {

  console.log("inject iframe");
  const ws = document.getElementById("WilmaStyles")
  let brightness =
    getComputedStyle(ws).getPropertyValue("--brightness")
  
    if (brightness.includes("dark")) {
    var style = iframe.contentDocument.createElement("style")
    iframe.setAttribute("allowTransparency", "true")
    style.innerHTML = iframeCSS
    console.log(iframe.contentDocument.head)

    iframe.contentDocument.head.appendChild(style)
  } else {
    console.log("theme does not have dark brightness")
  }
})