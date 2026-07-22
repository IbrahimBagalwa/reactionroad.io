/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const remarkGfmModule = require("remark-gfm")
const rehypePrettyCodeModule = require("rehype-pretty-code")
const remarkGfm = remarkGfmModule.default || remarkGfmModule
const rehypePrettyCode =
  rehypePrettyCodeModule.default || rehypePrettyCodeModule
const overnightTheme = require("overnight/themes/Overnight-Slumber.json")
overnightTheme.colors["editor.background"] = "var(--code-bg)"

type HighlightVisitNode = {
  properties?: {
    className?: string[]
  }
}

module.exports = {
  siteMetadata: {
    title: `Reactionroad`,
    description: `Ibrahim's personal blog, where I delve into the world of
        technology and beyond.`,
    author: `Ibrahim Bagalwa`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: overnightTheme,
                keepBackground: true,
                defaultLang: `text`,
                bypassInlineCode: true,
                onVisitHighlightedLine(node: HighlightVisitNode) {
                  node.properties ||= {}
                  node.properties.className ||= []
                  node.properties.className.push("line--highlighted")
                },
                onVisitHighlightedChars(node: HighlightVisitNode) {
                  node.properties ||= {}
                  node.properties.className ||= []
                  node.properties.className.push("word--highlighted")
                },
              },
            ],
          ],
        },
        gatsbyRemarkPlugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
            },
          },
        ],
      },
    },

    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/example.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
