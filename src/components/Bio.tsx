import ibrahimIMG from "../images/mba.jpg"

const Bio = () => {
  return (
    <div className="flex gap-5 mt-10 items-center mb-6">
      <img src={ibrahimIMG} alt="Ibrahim" className=" w-20 h-20 rounded-full" />
      <div className="text-sm">
        Welcome to Ibrahim's personal blog, where I delve into the world of
        technology and beyond. Join me on this captivating journey as I
        intertwine the power of language and code, unraveling complex concepts
        with utmost clarity.
      </div>
    </div>
  )
}

export default Bio
