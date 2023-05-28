import * as React from "react"
import { Link } from "gatsby"
import ThemeToggle from "./theme"
const Header = ({ siteTitle }) => (
  <header className="flex items-center justify-between">
    <Link className="text-[#E5E9F0] text-4xl" to="/">
      {siteTitle}
    </Link>
    <ThemeToggle />
  </header>
)

export default Header
