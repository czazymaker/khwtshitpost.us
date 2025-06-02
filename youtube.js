// YouTube API integration
document.addEventListener("DOMContentLoaded", () => {
  const videoContainer = document.getElementById("video-container")
  const videoLoading = document.getElementById("video-loading")
  const videoFrame = document.getElementById("video-frame")
  const videoTitle = document.getElementById("video-title")

  const channelId = "UCN_wqlAltouAH8nfx9sFbTA"

  // Fallback to direct embed
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

  // Function to load the latest video
  const loadLatestVideo = async () => {
    let directEmbedUsed = false // Flag to track if direct embed is used

    try {
      // Update loading text
      videoLoading.innerHTML = "<p>Loading video...</p>"

      // Try to fetch from RSS feed
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      )

      if (response.ok) {
        const data = await response.json()

        if (data && data.status === "ok" && data.items && data.items.length > 0) {
          // Extract video ID from link (format: https://www.youtube.com/watch?v=VIDEO_ID)
          const videoLink = data.items[0].link
          const videoId = videoLink.split("v=")[1]

          // Create iframe
          const iframe = document.createElement("iframe")
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`
          iframe.title = "YouTube video player"
          iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          iframe.allowFullscreen = true

          // Show video
          videoFrame.appendChild(iframe)
          videoFrame.classList.remove("hidden")
          videoLoading.classList.add("hidden")

          // Set title
          videoTitle.textContent = data.items[0].title

          return
        }
      }

      // If RSS feed fails, use direct embed
      useDirectEmbed()
      directEmbedUsed = true
    } catch (error) {
      console.error("Error fetching latest video:", error)
      useDirectEmbed()
      directEmbedUsed = true
    } finally {
      if (directEmbedUsed) {
        // Ensure direct embed is only called once
      }
    }
  }

  // Load the latest video
  loadLatestVideo()

  // Set a timeout to switch to direct embed if loading takes too long
  setTimeout(() => {
    if (videoFrame.classList.contains("hidden")) {
      useDirectEmbed()
    }
  }, 5000)
})
