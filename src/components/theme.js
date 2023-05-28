import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
const ThemeToggle = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label class="switch">
          <input
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
          <span class="slider round"></span>
        </label>
      )}
    </ThemeToggler>
  )
}

export default ThemeToggle
