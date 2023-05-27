import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header>
    <Link className="text-[#E5E9F0] text-4xl" to="/">
      {siteTitle}
    </Link>
  </header>
)

export default Header
