import * as React from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header className="flex w-full justify-center items-center">
    <Link className="text-[#E5E9F0]" to="/">
      {siteTitle}
    </Link>
  </header>
)

export default Header
