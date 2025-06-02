document.addEventListener("DOMContentLoaded", () => {
  const videoContainer = document.getElementById("video-container")
  const videoLoading = document.getElementById("video-loading")
  const videoFrame = document.getElementById("video-frame")
  const videoTitle = document.getElementById("video-title")

  const channelId = "UCN_wqlAltouAH8nfx9sFbTA"

  const useDirectEmbed = () => {
    const iframe = document.createElement("iframe")
    iframe.src = `https://www.youtube.com/embed?listType=user_uploads&list=${channelId}`
    iframe.title = "YouTube channel latest videos"
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    iframe.allowFullscreen = true

    videoFrame.appendChild(iframe)
    videoFrame.classList.remove("hidden")
    videoLoading.classList.add("hidden")
    videoTitle.textContent = "Latest Videos"
  }

  const loadLatestVideo = async () => {
    let directEmbedUsed = false

    try {
      videoLoading.innerHTML = "<p>Loading video...</p>"

      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      )

      if (response.ok) {
        const data = await response.json()

        if (data && data.status === "ok" && data.items && data.items.length > 0) {
          const videoLink = data.items[0].link
          const videoId = videoLink.split("v=")[1]

          const iframe = document.createElement("iframe")
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`
          iframe.title = "YouTube video player"
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          iframe.allowFullscreen = true

          videoFrame.appendChild(iframe)
          videoFrame.classList.remove("hidden")
          videoLoading.classList.add("hidden")

          videoTitle.textContent = data.items[0].title

          return
        }
      }

      useDirectEmbed()
      directEmbedUsed = true
    } catch (error) {
      console.error("Error fetching latest video:", error)
      useDirectEmbed()
      directEmbedUsed = true
    } finally {
      if (directEmbedUsed) {
      }
    }
  }

  loadLatestVideo()

  setTimeout(() => {
    if (videoFrame.classList.contains("hidden")) {
      useDirectEmbed()
    }
  }, 5000)
})
