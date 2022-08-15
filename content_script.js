const banners = document.querySelectorAll('.ban')
const blurs = document.querySelectorAll('.blr')

unblock()

async function unblock() {
  if (blurs.length < 1) return

  banners.forEach(banner => {
    banner.parentNode.replaceWith(...banner.parentNode.childNodes)
    banner.remove()
  })

  blurs.forEach(blur => {
    blur.replaceWith(...blur.childNodes)
  })

  const selectors = await fetch(chrome.runtime.getURL("./diff.txt"))
  const array = (await selectors.text()).split("\r\n")
  array.forEach(selector => {
    const elements = document.querySelectorAll(selector)
    elements.forEach(element => {
      // Override
      if (element.innerHTML.toLowerCase() == "wikipedia") return
      element.innerHTML = rot13(element.innerHTML)
    })
  })

  // Manual Selectors
  // Synonym selector: div.cont.wikt > g-ay & g-y
  const synonyms = document.querySelectorAll("div.cont.wikt > g-ay")
  synonyms.forEach(synonym => {
    synonym.insertAdjacentHTML("afterend", rot13(synonym.outerHTML))
    synonym.remove()
  })

  const gys = document.querySelectorAll("g-y")
  gys.forEach(gy => {
    gy.insertAdjacentHTML("afterend", rot13(gy.outerHTML))
    gy.remove()
  })

  // Example sentence selector
  const tables = document.querySelectorAll("div.cont.wikt > table > tbody")
  tables.forEach(table => table.childNodes.forEach(tr => tr.childNodes.forEach(td => td.childNodes.forEach(child => {
    if (child.nodeName != "#text" || child.wholeText == "\u00a0\u00a0\u00a0\u00a0\u00a0Fin: ") return
    const rotated = child.nodeValue.split(" ").reduce((prev, curr, i) => prev + " " + (i == 0 ? curr : rot13(curr)), "")
    child.nodeValue = rotated
  }))))
}

function rot13(string) {
  var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  var b = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"
  return string.replace(/[a-z]/gi, (c) => b[a.indexOf(c)]);
}