import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SeriesGroup from "../components/SeriesGroup"
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
    series?: string | null
    seriesOrder?: number | null
    seriesDescription?: string | null
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

type StandaloneItem = { kind: "standalone"; node: MarkdownNode; date: Date }
type SeriesItem = {
  kind: "series"
  name: string
  description: string | null
  posts: MarkdownNode[]
  date: Date
}
type ListItem = StandaloneItem | SeriesItem

const formatPostDate = (dateString: string) => {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return date.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function groupAndSort(edges: { node: MarkdownNode }[]): ListItem[] {
  const seriesMap = new Map<string, MarkdownNode[]>()
  const standalone: MarkdownNode[] = []

  for (const { node } of edges) {
    const s = node.frontmatter.series
    if (s) {
      seriesMap.set(s, [...(seriesMap.get(s) ?? []), node])
    } else {
      standalone.push(node)
    }
  }

  const items: ListItem[] = [
    ...standalone.map(node => ({
      kind: "standalone" as const,
      node,
      date: new Date(node.frontmatter.date),
    })),
    ...[...seriesMap.entries()].map(([name, posts]) => {
      const sorted = [...posts].sort(
        (a, b) =>
          (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0)
      )
      return {
        kind: "series" as const,
        name,
        description: sorted[0].frontmatter.seriesDescription ?? null,
        posts: sorted,
        date: new Date(sorted[0].frontmatter.date),
      }
    }),
  ]

  return items.sort((a, b) => b.date.getTime() - a.date.getTime())
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const items = groupAndSort(data.allMdx.edges)

  return (
    <Layout>
      <div className="relative -top-[10px] flex flex-col gap-8">
        {items.map(item => {
          if (item.kind === "series") {
            return (
              <SeriesGroup
                key={item.name}
                name={item.name}
                description={item.description}
                posts={item.posts}
                formatDate={formatPostDate}
              />
            )
          }

          const { node } = item
          return (
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
          )
        })}
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
            series
            seriesOrder
            seriesDescription
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
