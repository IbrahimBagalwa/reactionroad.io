/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
import path from "path"
import { GatsbyNode } from "gatsby"

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
const { createFilePath } = require(`gatsby-source-filesystem`)

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result: any) => {
    result.data.allMarkdownRemark.edges.forEach(({ node }: { node: any }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(__dirname, "./src/templates/blog-post.tsx"),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
}
export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
