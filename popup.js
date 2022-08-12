let checkBox = document.getElementById("switch");

chrome.storage.sync.get("unblock", ({ unblock }) => {
  checkBox.checked = unblock
});

checkBox.addEventListener("change", () => {
  chrome.storage.sync.set({unblock: checkBox.checked}, () => {});
});