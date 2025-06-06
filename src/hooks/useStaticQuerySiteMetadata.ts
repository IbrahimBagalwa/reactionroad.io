import { graphql, useStaticQuery } from "gatsby"

export type StaticData = {
  site: {
    siteMetadata: {
      title: string
    }
  }
}
export const useStaticQuerySiteMetadata = () => {
  const data = useStaticQuery<StaticData>(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return data
}
