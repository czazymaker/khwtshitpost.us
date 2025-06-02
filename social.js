// Скрипт для страницы социальных сетей
document.addEventListener("DOMContentLoaded", () => {
  // Установка текущего года в футере
  const currentYearElement = document.getElementById("current-year")
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear()
  }

  // Элементы для копирования
  const discordCopyBtn = document.getElementById("discord-copy-btn")
  const escargotCopyBtn = document.getElementById("escargot-copy-btn")
  const discordCopyIcon = document.getElementById("discord-copy-icon")
  const discordCheckIcon = document.getElementById("discord-check-icon")
  const escargotCopyIcon = document.getElementById("escargot-copy-icon")
  const escargotCheckIcon = document.getElementById("escargot-check-icon")
  const notification = document.getElementById("notification")
  const notificationText = document.getElementById("notification-text")

  // Проверяем, что все элементы найдены
  if (!discordCopyBtn || !escargotCopyBtn || !notification || !notificationText) {
    console.error("Some required elements not found")
    return
  }

  // Функция для показа уведомления
  const showNotification = (message) => {
    notificationText.textContent = message
    notification.classList.remove("hidden")

    // Скрываем уведомление через 2 секунды
    setTimeout(() => {
      notification.classList.add("hidden")
    }, 2000)
  }

  // Функция для копирования текста в буфер обмена
  const copyToClipboard = (text, type) => {
    // Проверяем поддержку Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          // Показываем иконку галочки
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

          // Показываем уведомление
          showNotification(`${text} скопирован в буфер обмена`)
        })
        .catch((err) => {
          console.error("Не удалось скопировать текст: ", err)
          showNotification("Не удалось скопировать текст")
        })
    } else {
      // Fallback для старых браузеров
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
          // Показываем иконку галочки
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

          showNotification(`${text} скопирован в буфер обмена`)
        } else {
          showNotification("Не удалось скопировать текст")
        }
      } catch (err) {
        console.error("Fallback copy failed: ", err)
        showNotification("Не удалось скопировать текст")
      }
    }
  }

  // Добавляем обработчики событий
  discordCopyBtn.addEventListener("click", (e) => {
    e.preventDefault()
    copyToClipboard("msoobe", "discord")
  })

  escargotCopyBtn.addEventListener("click", (e) => {
    e.preventDefault()
    copyToClipboard("czemaker@escargot.chat", "escargot")
  })
})
