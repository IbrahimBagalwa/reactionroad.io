import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import "../styles/global.css"

type BlogPostProps = {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        date: string
      }
    }
  }
}
const BlogPost = ({ data }: BlogPostProps) => {
  const {
    frontmatter: { title },
    html,
  } = data.markdownRemark

  return (
    <Layout>
      <div className="mt-14 mb-10">
        <h1 className="text-2xl font-bold dark:text-[#E5E9F0] text-[#011627]">
          {title}
        </h1>
        <div
          className="mt-10 markdown-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
