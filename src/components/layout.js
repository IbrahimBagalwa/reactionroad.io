/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import "../styles/global.css"
import Header from "./header"
import ThemeToggle from "./theme"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="bg-white dark:bg-[#011627] max-w-8xl w-full h-screen mx-auto text-[#607B96]">
      <section className="flex items-center justify-center w-full pt-10">
        <div>
          <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
          <ThemeToggle />
          <main>{children}</main>
          <footer className="flex text-[#E5E9F0]">
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
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
export default Layout
