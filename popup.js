const select = document.getElementById("theme-select")
select.addEventListener('change', ({target}) => {
  console.log("change theme to", target.value);
  chrome.runtime.sendMessage({action: 'changeTheme', data: target.value})
})