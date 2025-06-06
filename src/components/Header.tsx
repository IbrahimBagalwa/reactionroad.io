import { Link } from "gatsby"

type HeaderProps = {
  siteTitle: string
}
const Header = ({ siteTitle }: HeaderProps) => (
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
