document.addEventListener("DOMContentLoaded", () => {

  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  const discordCopyBtn = document.getElementById("discord-copy-btn")
  const escargotCopyBtn = document.getElementById("escargot-copy-btn")
  const discordCopyIcon = document.getElementById("discord-copy-icon")
  const discordCheckIcon = document.getElementById("discord-check-icon")
  const escargotCopyIcon = document.getElementById("escargot-copy-icon")
  const escargotCheckIcon = document.getElementById("escargot-check-icon")
  const notification = document.getElementById("notification")
  const notificationText = document.getElementById("notification-text")

  if (!discordCopyBtn || !escargotCopyBtn || !notification || !notificationText) {
    console.error("Some required elements not found")
    return
  }

  const showNotification = (message) => {
    notificationText.textContent = message
    notification.classList.remove("hidden")

    setTimeout(() => {
      notification.classList.add("hidden")
    }, 2000)
  }

  const copyToClipboard = (text, type) => {

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {

          if (type === "discord" && discordCopyIcon && discordCheckIcon) {
            discordCopyIcon.classList.add("hidden")
            discordCheckIcon.classList.remove("hidden")
            setTimeout(() => {
              discordCopyIcon.classList.remove("hidden")
              discordCheckIcon.classList.add("hidden")
            }, 2000)
          } else if (type === "escargot" && escargotCopyIcon && escargotCheckIcon) {
            escargotCopyIcon.classList.add("hidden")
            escargotCheckIcon.classList.remove("hidden")
            setTimeout(() => {
              escargotCopyIcon.classList.remove("hidden")
              escargotCheckIcon.classList.add("hidden")
            }, 2000)
          }

          showNotification(`${text} copied to clipboard`)
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err)
          showNotification("Failed to copy text")
        })
    } else {
      try {
        const textArea = document.createElement("textarea")
        textArea.value = text
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        const successful = document.execCommand("copy")
        document.body.removeChild(textArea)

        if (successful) {

          if (type === "discord" && discordCopyIcon && discordCheckIcon) {
            discordCopyIcon.classList.add("hidden")
            discordCheckIcon.classList.remove("hidden")
            setTimeout(() => {
              discordCopyIcon.classList.remove("hidden")
              discordCheckIcon.classList.add("hidden")
            }, 2000)
          } else if (type === "escargot" && escargotCopyIcon && escargotCheckIcon) {
            escargotCopyIcon.classList.add("hidden")
            escargotCheckIcon.classList.remove("hidden")
            setTimeout(() => {
              escargotCopyIcon.classList.remove("hidden")
              escargotCheckIcon.classList.add("hidden")
            }, 2000)
          }

          showNotification(`${text} copied to clipboard`)
        } else {
          showNotification("Failed to copy text")
        }
      } catch (err) {
        console.error("Fallback copy failed: ", err)
        showNotification("Failed to copy text")
      }
    }
  }


  discordCopyBtn.addEventListener("click", (e) => {
    e.preventDefault()
    copyToClipboard("msoobe", "discord")
  })

  escargotCopyBtn.addEventListener("click", (e) => {
    e.preventDefault()
    copyToClipboard("czemaker@escargot.chat", "escargot")
  })
})
