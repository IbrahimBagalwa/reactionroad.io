import { useState } from "react"
import { Link } from "gatsby"

interface SeriesPost {
  id: string
  fields: { slug: string }
  frontmatter: { title: string; date: string }
}

interface SeriesGroupProps {
  name: string
  description: string | null
  posts: SeriesPost[]
  formatDate: (date: string) => string
}

const SeriesGroup = ({ name, description, posts, formatDate }: SeriesGroupProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const ICON_WIDTH = "w-5" // 20px — shared between chevron column and all indented content

  return (
    <div className="py-4">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full text-left"
        aria-expanded={isOpen}
      >
        {/* Title row: fixed-width chevron column + title */}
        <div className="flex items-center gap-2">
          <span className={`${ICON_WIDTH} flex-shrink-0 flex items-center justify-center`}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 10 10"
              className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                isOpen ? "rotate-90" : ""
              }`}
              aria-hidden="true"
            >
              <path
                d="M3 1.5L7 5L3 8.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <h1 className="home-post-title dark:text-white font-bold text-[#222] text-2xl mb-1">
            {name}
          </h1>
        </div>

        {/* Meta row: spacer keeps it flush with title */}
        <div className="flex gap-2">
          <span className={`${ICON_WIDTH} flex-shrink-0`} aria-hidden="true" />
          <div>
            <p className="text-[13px] text-gray-700 dark:text-gray-300">
              {formatDate(posts[0].frontmatter.date)}
              {" · "}
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </p>
            {description && (
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <ul className="mt-3 flex flex-col gap-2 border-l border-gray-200 dark:border-gray-700 ml-[10px] pl-5">
          {posts.map((post, i) => (
            <li key={post.id}>
              <Link
                to={post.fields.slug}
                className="block hover:scale-[1.005] will-change-transform transition-transform duration-150"
              >
                <p className="dark:text-white text-[#222] font-semibold text-base">
                  <span className="text-[12px] text-gray-400 dark:text-gray-500 font-mono mr-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {post.frontmatter.title}
                </p>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5 ml-[22px]">
                  {formatDate(post.frontmatter.date)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SeriesGroup
