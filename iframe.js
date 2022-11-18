const iframeCSS = `
html,body {
  background-color: transparent !important; 
  color: white !important;
}
`

console.log("run inject");
document.querySelectorAll("iframe").forEach(iframe => {

  console.log("inject iframe");

  var style = iframe.contentDocument.createElement("style")
  iframe.setAttribute("allowTransparency", "true")
  style.innerHTML = iframeCSS
  console.log(iframe.contentDocument.head)

  iframe.contentDocument.head.appendChild(style)
})