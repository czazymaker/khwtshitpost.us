document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const moonIcon = document.getElementById("moon-icon")
  const sunIcon = document.getElementById("sun-icon")

  const getThemePreference = () => {
    if (localStorage.getItem("theme") === "light") {
      return "light"
    }
    return "dark"
  }

  const setTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
      moonIcon.classList.add("hidden")
      sunIcon.classList.remove("hidden")
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      moonIcon.classList.remove("hidden")
      sunIcon.classList.add("hidden")
    }
    localStorage.setItem("theme", theme)
  }

  setTheme(getThemePreference())

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme") || "dark"
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  })
})
