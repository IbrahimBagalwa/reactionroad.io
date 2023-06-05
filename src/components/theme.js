import React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
const ThemeToggle = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
        <label className="switch">
          <input
            type="checkbox"
            onChange={e => toggleTheme(e.target.checked ? "dark" : "light")}
            checked={theme === "dark"}
          />
          <span className="slider round"></span>
        </label>
      )}
    </ThemeToggler>
  )
}

export default ThemeToggle
