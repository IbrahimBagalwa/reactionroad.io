const fs = require("fs")
const path = require("path")
const visit = require("unist-util-visit")

module.exports = ({ markdownAST, markdownNode }) => {
  const fileDir = path.dirname(
    markdownNode.fileAbsolutePath || markdownNode.absolutePath || ""
  )

  const replacements = []

  visit(markdownAST, "image", (node, index, parent) => {
    if (!node.url || !node.url.endsWith(".svg")) return
    const absPath = path.resolve(fileDir, node.url)
    if (!fs.existsSync(absPath)) return
    replacements.push({ index, parent, absPath })
  })

  for (const { index, parent, absPath } of replacements) {
    let svg = fs.readFileSync(absPath, "utf8")
    svg = svg
      .replace(/<\?xml[^>]*\?>/g, "")
      .replace(/<metadata>[\s\S]*?<\/metadata>/g, "")
      .trim()

    parent.children[index] = {
      type: "html",
      value: `<span class="svg-inline">${svg}</span>`,
    }
  }

  return markdownAST
}
