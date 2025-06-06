import * as React from "react"
import { Link } from "gatsby"
const Header = ({ siteTitle }) => (
  <header className="flex items-center justify-between">
    <Link
      className="dark:text-[#E5E9F0] text-[#011627] font-bold text-4xl"
      to="/"
    >
      {siteTitle}
    </Link>
  </header>
)

export default Header
