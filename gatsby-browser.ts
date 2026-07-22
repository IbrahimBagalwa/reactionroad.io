/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
import "./src/styles/global.css"
import "@fontsource/montserrat/900.css"
import "@fontsource/merriweather/400.css"
import "@fontsource/merriweather/400-italic.css"
import "@fontsource/merriweather/700.css"
import "@fontsource/merriweather/700-italic.css"

export const onClientEntry = (): void => {
  const storedTheme = window.localStorage.getItem("theme")
  const shouldUseDarkTheme = storedTheme ? storedTheme === "dark" : true

  document.documentElement.classList.toggle("dark", shouldUseDarkTheme)

  if (!storedTheme) {
    window.localStorage.setItem("theme", "dark")
  }
}
