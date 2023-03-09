let script = document.createElement('script')
script.src = chrome.runtime.getURL('monkeyPatch.js')
script.onload = function() {
  this.remove()
}
document.documentElement.appendChild(script)