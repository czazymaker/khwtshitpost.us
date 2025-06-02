document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear()

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    year: "numeric",
  }
  document.getElementById("current-date").textContent = new Date().toLocaleDateString("en-US", options)

  const uptimeCounter = document.getElementById("uptime-counter")
  const startTime = Date.now()

  setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
    uptimeCounter.textContent = formatUptime(elapsedSeconds)
  }, 1000)

  function formatUptime(seconds) {
    if (seconds < 60) return `${seconds} secs`
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins} min${mins !== 1 ? "s" : ""}, ${secs} secs`
    }
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hours} hour${hours !== 1 ? "s" : ""}, ${mins} min${mins !== 1 ? "s" : ""}`
  }
})
