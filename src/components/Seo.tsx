import { useStaticQuery, graphql } from "gatsby"
import { type ReactNode } from "react"

type SeoProps = {
  description?: string
  title: string
  children?: ReactNode
}
type SiteMetadata = {
  title: string
  description: string
  author: string
}
type SiteStaticQueryData = {
  site: {
    siteMetadata: SiteMetadata
  }
}
function Seo({ description, title, children }: SeoProps) {
  const { site } = useStaticQuery<SiteStaticQueryData>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
