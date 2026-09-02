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
  frontmatter: {
    title: string
    series?: string | null
    seriesOrder?: number | null
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
            frontmatter {
              title
              series
              seriesOrder
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

  // Build a lookup: series name → posts sorted by seriesOrder
  const seriesMap = new Map<string, MdxEdgeNode[]>()
  for (const { node } of edges) {
    const s = node.frontmatter.series
    if (s) {
      const group = seriesMap.get(s) ?? []
      group.push(node)
      seriesMap.set(s, group)
    }
  }
  for (const posts of seriesMap.values()) {
    posts.sort(
      (a, b) => (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0)
    )
  }

  edges.forEach(({ node }) => {
    let nextPost: { title: string; slug: string } | null = null

    const s = node.frontmatter.series
    if (s) {
      const group = seriesMap.get(s) ?? []
      const idx = group.findIndex(n => n.id === node.id)
      if (idx !== -1 && idx < group.length - 1) {
        const next = group[idx + 1]
        nextPost = { title: next.frontmatter.title, slug: next.fields.slug }
      }
    }

    createPage({
      path: node.fields.slug,
      component: `${path.resolve(
        __dirname,
        "./src/templates/blog-post.tsx"
      )}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        nextPost,
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
