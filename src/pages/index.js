import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { Link, graphql } from "gatsby"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={node.fields.slug}>
          <div key={node.id} className="mt-10">
            <h1 className="text-[#E5E9F0]">
              {node.frontmatter.title} - {node.frontmatter.date}
            </h1>
            <span>{node.frontmatter.description}</span>
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
