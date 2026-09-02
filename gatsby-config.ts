/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const fs = require("fs")
const path = require("path")
const remarkGfmModule = require("remark-gfm")
const rehypePrettyCodeModule = require("rehype-pretty-code")
const visit = require("unist-util-visit")
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

type ImageNode = {
  url: string
}

type ParentNode = {
  children: unknown[]
}

function remarkInlineSvg() {
  return (tree: unknown, vfile: { path?: string }) => {
    const fileDir = path.dirname(vfile.path || "")
    const replacements: { index: number; parent: ParentNode; absPath: string }[] = []

    visit(tree, "image", (node: ImageNode, index: number, parent: ParentNode) => {
      if (!node.url || !node.url.endsWith(".svg")) return
      const absPath = path.resolve(fileDir, node.url)
      if (!fs.existsSync(absPath)) return
      replacements.push({ index, parent, absPath })
    })

    for (const { index, parent, absPath } of replacements) {
      let svg: string = fs.readFileSync(absPath, "utf8")
      svg = svg
        .replace(/<\?xml[^>]*\?>/g, "")
        .replace(/<metadata>[\s\S]*?<\/metadata>/g, "")
        .trim()

      parent.children[index] = {
        type: "html",
        value: `<span class="svg-inline">${svg}</span>`,
      }
    }
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
          remarkPlugins: [remarkGfm, remarkInlineSvg],
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
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
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
    `gatsby-transformer-sharp`,
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
