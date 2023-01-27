// from wilmonium -- https://github.com/developerfromjokela/wilmonium/blob/main/js/wilmonium.js
async function refresh() {
  const res = await fetch(document.URL)
  // session expired
  if (res.redirected) {
    window.location.reload()
    return
  }
  window.AutoLogoutWarning.tMinusLogout = window.autoLogoutDelay;
}

setInterval(refresh, 4 * 60 * 1000)