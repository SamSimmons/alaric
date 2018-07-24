
export const getQueryParams = ({ grappler = "All", tags = [], page = 1, pageSize }) => {
  let grapplerStr = `grappler=${grappler}`
  let pageStr = `&page=${page}`
  let tagsStr = tags.reduce((result, tag) => `${result}&tag=${tag}`, '')
  let pageSizeStr = pageSize ? `&page_size=${pageSize}` : ''
  return `?${grapplerStr}${pageStr}${pageSizeStr}${tagsStr}`
}
