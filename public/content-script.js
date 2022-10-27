const cssTempl = ({ navbar, alert, main }) => `
/*Väriasetukset*/

:root{
--navbar: ${navbar};
--alert: #cd02a1;
    
--main:#fff; /*Laatikoiden väri*/
--main1:#fff; /*Muiden laatikoiden värit*/

/*Viestit-Osio*/
--border:#099dbe;
--viestit1:#fff; /*Viestien taustaväri*/
    
/*Työjärjestys*/
--tunti:#fafafa; /*Tuntien värit*/
--tunti1:#000; /*Tuntien reunat*/
    
/*OPINNOT-Sivu - (Pak)olliset, (syv)entävät ja (sov)eltavat*/
/*Pakolliset*/
--pak: #88ef75b3;/*Laatikon väri*/
--pak1: #1aa400; /*Laatikon reunat*/
/*Syventävät*/
--syv: #ecff31;  /*Laatikon väri*/
--syv1: #ffe528; /*Laatikon reunat*/
/*Soveltavat*/
--sov: #fff;     /*Laatikon väri*/
--sov1: #999999; /*Laatikon reunat*/
}`

const defaults = {
  navbar: "#ff000069"
}

chrome.runtime.sendMessage({ action: 'requestCSS' }, injectCSS)

let cachedVariables = {}

async function getVariables() {
  if (cachedVariables) return cachedVariables
  return new Promise((resolve) => {
    chrome.storage.sync.get('default', (items) => {
      if (!items) {
        chrome.storage.sync.set({ default: defaults })
        items = defaults
      }
      cachedVariables = items
      resolve(items)
    })
  })
}

function injectCSS(msg) {
  var style = document.createElement('style');
  style.id = "WilmaStyles";
  const variables = getVariables()
  const cssText = cssTempl(variables) + msg.data
  style.textContent = cssText;
  (document.body || document.head || document.documentElement).appendChild(style);
}

function refresh() {
  window.location.reload()
}
/*Refreshes the page every 20 minutes to prevent auto log off. My dumbass couldn't find a better way.*/
setInterval(refresh, 1200000)