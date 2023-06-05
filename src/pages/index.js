import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={node.fields.slug}>
          <div key={node.id} className="mt-14">
            <h1 className="dark:text-[#E5E9F0] text-[#011627] text-xl">
              {node.frontmatter.title}
            </h1>
            <p className="text-xs">
              {node.frontmatter.date}.{" "}
              {Math.ceil(node.fields.slug.length / 200)} min read
            </p>
            <span className="dark:text-[#4D5BCE] text-[#cccccc] text-sm">
              {node.frontmatter.description}
            </span>
          </div>
        </Link>
      ))}
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
