import ibrahimIMG from "../images/mba.jpg"

const Bio = () => {
  return (
    <div className="flex gap-5 mt-10 items-center mb-6">
      <a
        href="https://ibrahimbagalwa.netlify.app/"
        aria-label="Visit Ibrahim website"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={ibrahimIMG}
          alt="Ibrahim"
          className="w-20 h-20 rounded-full transition-transform duration-150 hover:scale-[1.03]"
        />
      </a>
      <div className="text-sm dark:text-gray-300 text-gray-700">
        I&apos;m Ibrahim, and I write about software engineering, practical
        problem solving, and building reliable systems with clarity.
      </div>
    </div>
  )
}

export default Bio
