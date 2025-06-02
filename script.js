document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent = new Date().getFullYear()

  const videoContainer = document.getElementById("video-container")
  const videoLoading = document.getElementById("video-loading")
  const videoFrame = document.getElementById("video-frame")
  const videoTitle = document.getElementById("video-title")

  const channelId = "UCN_wqlAltouAH8nfx9sFbTA"

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

  const getLatestVideoViaRSS = async () => {
    try {
      videoLoading.innerHTML = "<p>Loading video...</p>"

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

      const latestVideo = data.items[0]

      const videoLink = latestVideo.link
      const videoId = videoLink.split("v=")[1]

      if (!videoId) {
        throw new Error("Could not extract video ID")
      }

      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`
      iframe.title = "YouTube video player"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true

      videoFrame.innerHTML = ""
      videoFrame.appendChild(iframe)

      videoFrame.classList.remove("hidden")
      videoLoading.classList.add("hidden")

      videoTitle.textContent = latestVideo.title

      return true
    } catch (error) {
      console.error("Error fetching latest video via RSS:", error)
      return false
    }
  }

  const getLatestVideoViaInvidious = async () => {
    try {
      const response = await fetch(`https://invidious.snopyta.org/api/v1/channels/${channelId}/videos?sort_by=newest`)

      if (!response.ok) {
        throw new Error(`Failed to fetch from Invidious API: ${response.status}`)
      }

      const videos = await response.json()

      if (!videos || videos.length === 0) {
        throw new Error("No videos found via Invidious API")
      }

      const latestVideo = videos[0]

      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${latestVideo.videoId}?autoplay=0&rel=0`
      iframe.title = "YouTube video player"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true

      videoFrame.innerHTML = ""
      videoFrame.appendChild(iframe)

      videoFrame.classList.remove("hidden")
      videoLoading.classList.add("hidden")

      videoTitle.textContent = latestVideo.title

      return true
    } catch (error) {
      console.error("Error fetching latest video via Invidious:", error)
      return false
    }
  }

  const getLatestVideoViaYTScraper = async () => {
    try {
      const response = await fetch(`https://yt.lemnoslife.com/channels?part=snippet&id=${channelId}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch from YT.Scraper API: ${response.status}`)
      }

      const data = await response.json()

      if (!data.items || data.items.length === 0 || !data.items[0].snippet || !data.items[0].snippet.latestVideo) {
        throw new Error("No videos found via YT.Scraper API")
      }

      const latestVideo = data.items[0].snippet.latestVideo

      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${latestVideo.id}?autoplay=0&rel=0`
      iframe.title = "YouTube video player"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true

      videoFrame.innerHTML = ""
      videoFrame.appendChild(iframe)

      videoFrame.classList.remove("hidden")
      videoLoading.classList.add("hidden")

      videoTitle.textContent = latestVideo.title

      return true
    } catch (error) {
      console.error("Error fetching latest video via YT.Scraper:", error)
      return false
    }
  }


  const useFallbackVideo = () => {
    const fallbackVideoId = "oWiA17Rqsoo"

    const iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed/${fallbackVideoId}?autoplay=0&rel=0`
    iframe.title = "YouTube video player"
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true

    videoFrame.innerHTML = ""
    videoFrame.appendChild(iframe)

    videoFrame.classList.remove("hidden")
    videoLoading.classList.add("hidden")

    videoTitle.textContent = "My unfinished crazy errors and parts for collabs"
  }

  let rssSuccess = false
  let invidiousSuccess = false
  let ytScraperSuccess = false

  const loadLatestVideo = async () => {
    rssSuccess = await getLatestVideoViaRSS()

    if (rssSuccess) {
      return
    }

    invidiousSuccess = await getLatestVideoViaInvidious()

    if (invidiousSuccess) {
      return
    }

    ytScraperSuccess = await getLatestVideoViaYTScraper()

    if (ytScraperSuccess) {
      return
    }

    useDirectEmbed()
  }

  loadLatestVideo()

  setTimeout(() => {
    if (videoFrame.classList.contains("hidden")) {
      useDirectEmbed()
    }
  }, 10000)
})
