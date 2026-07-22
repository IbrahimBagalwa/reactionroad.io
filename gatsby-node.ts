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

type MdxEdgeNode = {
  id: string
  fields: {
    slug: string
  }
  internal: {
    contentFilePath: string
  }
}

type CreatePagesQueryResult = {
  data?: {
    allMdx?: {
      edges: Array<{
        node: MdxEdgeNode
      }>
    }
  }
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions
  const result = (await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    }
  `)) as CreatePagesQueryResult

  const edges = result.data?.allMdx?.edges ?? []

  edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: `${path.resolve(
        __dirname,
        "./src/templates/blog-post.tsx"
      )}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    })
  })
}

export const onCreateNode: GatsbyNode["onCreateNode"] = api => {
  const { node, actions, getNode } = api
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
