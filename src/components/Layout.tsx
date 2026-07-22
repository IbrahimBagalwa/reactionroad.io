import "../styles/global.css"

import Bio from "./Bio"
import Header from "./Header"
import { ReactNode, useEffect, useState } from "react"

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme")
    const shouldUseDarkTheme = storedTheme ? storedTheme === "dark" : true

    setIsDark(shouldUseDarkTheme)
    document.documentElement.classList.toggle("dark", shouldUseDarkTheme)

    if (!storedTheme) {
      window.localStorage.setItem("theme", "dark")
    }
  }, [])

  const handleToggleTheme = () => {
    setIsDark(prev => {
      const nextIsDark = !prev

      document.documentElement.classList.toggle("dark", nextIsDark)
      window.localStorage.setItem("theme", nextIsDark ? "dark" : "light")

      return nextIsDark
    })
  }

  return (
    <div className="bg-white dark:bg-[#011627] mx-auto dark:text-[#bfc0c2] text-[#011627] min-h-screen">
      <section className="flex items-center justify-center max-w-xl mx-auto w-full pt-10 relative">
        <div>
          <Header isDark={isDark} onToggleTheme={handleToggleTheme} />
          <Bio />
          <main className="mb-10">{children}</main>
          <footer className="flex dark:text-[#E5E9F0] font-bold bottom-2 absolute text-[#011627]">
            <a href="https://github.com/IbrahimBagalwa" className="pr-2">
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/ibrahim-bagalwa-831400198/"
              className="px-2"
            >
              Linkedin
            </a>
            <a href="https://twitter.com/ibrahim_Bagalwa" className="pl-2">
              Twitter
            </a>
          </footer>
        </div>
      </section>
    </div>
  )
}
export default Layout
