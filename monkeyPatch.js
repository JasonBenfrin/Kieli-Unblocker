const timeoutCreate = window.setTimeout
const timeoutDel = window.clearTimeout

window.timeouts = new Set()

window.setTimeout = (handler, timeout, ...args) => {
  const id = timeoutCreate(handler, timeout, ...args)
  window.timeouts.add(id)
  if (timeout == 4000) clearTimeout(id)
  return id
}

window.clearTimeout = (id) => {
  window.timeouts.delete(id)
  timeoutDel(id)
}