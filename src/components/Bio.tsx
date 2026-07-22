import ibrahimIMG from "../images/mba.jpg"

const Bio = () => {
  return (
    <div className="flex gap-5 mt-10 items-center mb-6">
      <img src={ibrahimIMG} alt="Ibrahim" className=" w-20 h-20 rounded-full" />
      <div className="text-sm">
        I&apos;m Ibrahim, and I write about software engineering, practical
        problem solving, and building reliable systems with clarity.
      </div>
    </div>
  )
}

export default Bio
