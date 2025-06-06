import { Link } from "gatsby"
import { use } from "react"
import { useStaticQuerySiteMetadata } from "../hooks/useStaticQuerySiteMetadata"

const Header = () => {
  const data = useStaticQuerySiteMetadata()
  return (
    <header className="flex items-center justify-between">
      <Link
        className="dark:text-[#E5E9F0] text-[#011627] font-bold text-4xl"
        to="/"
      >
        {data.site.siteMetadata.title || "ReactionRoad"}
      </Link>
    </header>
  )
}

export default Header
