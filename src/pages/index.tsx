import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Link, graphql } from "gatsby"

import { PageProps } from "gatsby"

interface MarkdownNode {
  id: string
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    date: string
    description: string
  }
  excerpt: string
}

interface IndexPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      edges: { node: MarkdownNode }[]
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={node.fields.slug} key={node.id} className="mt-14">
          <>
            <h1 className="dark:text-[#E5E9F0] font-bold text-[#011627] text-2xl">
              {node.frontmatter.title}
            </h1>
            <p className="text-xs">
              {node.frontmatter.date}.{" "}
              {Math.ceil(node.fields.slug.length / 200)} min read
            </p>
            <span className="dark:text-[#4D5BCE] text-[#cccccc] text-sm">
              {node.frontmatter.description}
            </span>
          </>
        </Link>
      ))}
    </Layout>
  )
}

export const Head = () => (
  <Seo title="Home" description="Welcome to the homepage">
    <div>Welcome to Reactionroad!</div>
  </Seo>
)

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
