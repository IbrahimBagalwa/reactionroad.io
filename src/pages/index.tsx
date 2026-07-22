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

const formatPostDate = (dateString: string) => {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return dateString
  }

  return date.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  return (
    <Layout>
      <div className="relative -top-[10px] flex flex-col gap-8">
        {data.allMdx.edges.map(({ node }) => (
          <Link
            to={node.fields.slug}
            key={node.id}
            className="block py-4 hover:scale-[1.005] will-change-transform transition-transform duration-150"
          >
            <article>
              <h1 className="home-post-title dark:text-white font-bold text-[#222] text-2xl mb-1">
                {node.frontmatter.title}
              </h1>
              <p className="text-[13px] text-gray-700 dark:text-gray-300">
                {formatPostDate(node.frontmatter.date)}.{" "}
                {Math.ceil(node.fields.slug.length / 200)} min read
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {node.frontmatter.description}
              </p>
            </article>
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
