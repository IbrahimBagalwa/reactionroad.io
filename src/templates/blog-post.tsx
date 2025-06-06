import { graphql } from "gatsby"
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
      <div className="mt-14">
        <h1 className="text-2xl font-bold dark:text-[#E5E9F0] text-[#011627]">
          {title}
        </h1>
        <div className="mt-10" dangerouslySetInnerHTML={{ __html: html }} />
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
