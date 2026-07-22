import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import "../styles/global.css"

type BlogPostProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
      }
    }
  }
  children: React.ReactNode
}
const BlogPost = ({ data, children }: BlogPostProps) => {
  const {
    frontmatter: { title },
  } = data.mdx

  return (
    <Layout>
      <div className="mt-14 mb-10">
        <h1 className="post-title text-2xl font-bold dark:text-[#E5E9F0] text-[#011627]">
          {title}
        </h1>
        <div className="mt-10 markdown-content">{children}</div>
        <div className="mt-10 pt-6 border-t border-[#cccccc] dark:border-[#1d3b53]">
          <Link to="/" className="font-bold text-[#011627] dark:text-[#E5E9F0]">
            Back to home
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
      }
    }
  }
`
