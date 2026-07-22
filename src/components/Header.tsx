import { Link } from "gatsby"
import { useStaticQuerySiteMetadata } from "../hooks/useStaticQuerySiteMetadata"

type HeaderProps = {
  isDark: boolean
  onToggleTheme: () => void
}

const Header = ({ isDark, onToggleTheme }: HeaderProps) => {
  const data = useStaticQuerySiteMetadata()

  return (
    <header className="flex items-center justify-between">
      <Link
        className="dark:text-[#f1f1f1] text-[#0b1220] font-bold text-4xl"
        to="/"
      >
        {data.site.siteMetadata.title || "ReactionRoad"}
      </Link>
      <label className="switch" aria-label="Toggle dark mode">
        <input
          type="checkbox"
          checked={isDark}
          onChange={onToggleTheme}
          aria-label="Dark mode toggle"
        />
        <span className="slider round" />
      </label>
    </header>
  )
}

export default Header
