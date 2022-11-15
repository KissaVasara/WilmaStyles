const select = document.getElementById("theme-select")

chrome.storage.local.get("theme", ({theme}) => {
  console.log(theme);
  for (const opt of select.children) {
    if (opt.value == theme.name) {
      opt.selected = "selected"
    }
  }
})

select.addEventListener('change', ({ target }) => {
  console.log("change theme to", target.value);
  chrome.runtime.sendMessage({ action: 'changeTheme', data: target.value })
})