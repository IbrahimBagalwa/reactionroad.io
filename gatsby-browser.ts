/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
import "./src/styles/global.css"
import "prismjs/themes/prism-okaidia.css"

export const onClientEntry = (): void => {
  const storedTheme = window.localStorage.getItem("theme")
  const shouldUseDarkTheme = storedTheme ? storedTheme === "dark" : true

  document.documentElement.classList.toggle("dark", shouldUseDarkTheme)

  if (!storedTheme) {
    window.localStorage.setItem("theme", "dark")
  }
}
