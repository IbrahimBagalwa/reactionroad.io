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
    allMdx: {
      edges: { node: MarkdownNode }[]
    }
  }
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  return (
    <Layout>
      <div className="flex flex-col gap-14">
        {data.allMdx.edges.map(({ node }) => (
          <Link to={node.fields.slug} key={node.id} className="block">
            <h1 className="home-post-title dark:text-[#f1f1f1] font-bold text-[#0b1220] text-2xl mb-1">
              {node.frontmatter.title}
            </h1>
            <p className="text-xs dark:text-[#979797]">
              {node.frontmatter.date}.{" "}
              {Math.ceil(node.fields.slug.length / 200)} min read
            </p>
            <span className="dark:text-[#b0b0b0] text-[#5b6475] text-sm">
              {node.frontmatter.description}
            </span>
          </Link>
        ))}
      </div>
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
    allMdx(sort: { frontmatter: { date: DESC } }) {
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
