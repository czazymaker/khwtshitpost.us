// Основной скрипт для главной страницы
document.addEventListener("DOMContentLoaded", () => {
  // Установка текущего года в футере
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Константы для работы с видео
  const videoContainer = document.getElementById("video-container")
  const videoLoading = document.getElementById("video-loading")
  const videoFrame = document.getElementById("video-frame")
  const videoTitle = document.getElementById("video-title")

  const channelId = "UCN_wqlAltouAH8nfx9sFbTA"

  // Функция для прямого встраивания плейлиста канала (запасной вариант)
  const useDirectEmbed = () => {
    const iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed/videoseries?list=UUN_wqlAltouAH8nfx9sFbTA`
    iframe.title = "YouTube channel latest videos"
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true

    videoFrame.innerHTML = ""
    videoFrame.appendChild(iframe)
    videoFrame.classList.remove("hidden")
    videoLoading.classList.add("hidden")
    videoTitle.textContent = "Latest Videos"
  }

  // Функция для получения последнего видео через RSS
  const getLatestVideoViaRSS = async () => {
    try {
      // Показываем состояние загрузки
      videoLoading.innerHTML = "<p>Loading video...</p>"

      // Используем RSS-to-JSON API для получения данных канала
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.status}`)
      }

      const data = await response.json()

      if (data.status !== "ok" || !data.items || data.items.length === 0) {
        throw new Error("No videos found in RSS feed")
      }

      // Получаем последнее видео
      const latestVideo = data.items[0]

      // Извлекаем ID видео из ссылки
      const videoLink = latestVideo.link
      const videoId = videoLink.split("v=")[1]

      if (!videoId) {
        throw new Error("Could not extract video ID")
      }

      // Создаем iframe для видео
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`
      iframe.title = "YouTube video player"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true

      // Очищаем контейнер и добавляем iframe
      videoFrame.innerHTML = ""
      videoFrame.appendChild(iframe)

      // Показываем видео
      videoFrame.classList.remove("hidden")
      videoLoading.classList.add("hidden")

      // Устанавливаем заголовок
      videoTitle.textContent = latestVideo.title

      return true
    } catch (error) {
      console.error("Error fetching latest video via RSS:", error)
      return false
    }
  }

  // Функция для получения последнего видео через YouTube API (запасной вариант)
  const getLatestVideoViaInvidious = async () => {
    try {
      // Используем публичный Invidious API для получения данных канала
      const response = await fetch(`https://invidious.snopyta.org/api/v1/channels/${channelId}/videos?sort_by=newest`)

      if (!response.ok) {
        throw new Error(`Failed to fetch from Invidious API: ${response.status}`)
      }

      const videos = await response.json()

      if (!videos || videos.length === 0) {
        throw new Error("No videos found via Invidious API")
      }

      // Получаем последнее видео
      const latestVideo = videos[0]

      // Создаем iframe для видео
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${latestVideo.videoId}?autoplay=0&rel=0`
      iframe.title = "YouTube video player"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true

      // Очищаем контейнер и добавляем iframe
      videoFrame.innerHTML = ""
      videoFrame.appendChild(iframe)

      // Показываем видео
      videoFrame.classList.remove("hidden")
      videoLoading.classList.add("hidden")

      // Устанавливаем заголовок
      videoTitle.textContent = latestVideo.title

      return true
    } catch (error) {
      console.error("Error fetching latest video via Invidious:", error)
      return false
    }
  }

  // Функция для получения последнего видео через YT.Scraper API (запасной вариант)
  const getLatestVideoViaYTScraper = async () => {
    try {
      // Используем YT.Scraper API для получения данных канала
      const response = await fetch(`https://yt.lemnoslife.com/channels?part=snippet&id=${channelId}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch from YT.Scraper API: ${response.status}`)
      }

      const data = await response.json()

      if (!data.items || data.items.length === 0 || !data.items[0].snippet || !data.items[0].snippet.latestVideo) {
        throw new Error("No videos found via YT.Scraper API")
      }

      // Получаем последнее видео
      const latestVideo = data.items[0].snippet.latestVideo

      // Создаем iframe для видео
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${latestVideo.id}?autoplay=0&rel=0`
      iframe.title = "YouTube video player"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true

      // Очищаем контейнер и добавляем iframe
      videoFrame.innerHTML = ""
      videoFrame.appendChild(iframe)

      // Показываем видео
      videoFrame.classList.remove("hidden")
      videoLoading.classList.add("hidden")

      // Устанавливаем заголовок
      videoTitle.textContent = latestVideo.title

      return true
    } catch (error) {
      console.error("Error fetching latest video via YT.Scraper:", error)
      return false
    }
  }

  // Функция для использования резервного видео
  const useFallbackVideo = () => {
    // ID видео "My unfinished crazy errors and parts for collabs"
    const fallbackVideoId = "Ks-_Mh1QhMc"

    // Создаем iframe для видео
    const iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed/${fallbackVideoId}?autoplay=0&rel=0`
    iframe.title = "YouTube video player"
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true

    // Очищаем контейнер и добавляем iframe
    videoFrame.innerHTML = ""
    videoFrame.appendChild(iframe)

    // Показываем видео
    videoFrame.classList.remove("hidden")
    videoLoading.classList.add("hidden")

    // Устанавливаем заголовок
    videoTitle.textContent = "My unfinished crazy errors and parts for collabs"
  }

  let rssSuccess = false
  let invidiousSuccess = false
  let ytScraperSuccess = false

  // Функция для загрузки последнего видео с использованием всех методов
  const loadLatestVideo = async () => {
    // Пробуем получить видео через RSS
    rssSuccess = await getLatestVideoViaRSS()

    if (rssSuccess) {
      return
    }

    // Если RSS не сработал, пробуем через Invidious API
    invidiousSuccess = await getLatestVideoViaInvidious()

    if (invidiousSuccess) {
      return
    }

    // Если Invidious не сработал, пробуем через YT.Scraper API
    ytScraperSuccess = await getLatestVideoViaYTScraper()

    if (ytScraperSuccess) {
      return
    }

    // Если все методы не сработали, используем прямое встраивание плейлиста
    useDirectEmbed()
  }

  // Загружаем последнее видео
  loadLatestVideo()

  // Устанавливаем таймаут для переключения на прямое встраивание, если загрузка занимает слишком много времени
  setTimeout(() => {
    if (videoFrame.classList.contains("hidden")) {
      useDirectEmbed()
    }
  }, 10000)
})
