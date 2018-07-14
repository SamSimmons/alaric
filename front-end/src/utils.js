
export const getQueryParams = ({ grappler = "All", tags = [], page = 1 }) => {
  let grapplerStr = `grappler=${grappler}`
  let pageStr = `&page=${page}`
  let tagsStr = tags.reduce((result, tag) => `${result}&tag=${tag}`, '')
  return `?${grapplerStr}${pageStr}${tagsStr}`
}
