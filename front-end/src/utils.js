
export const getQueryParams = ({ grappler = "All", tags = [], page = 1, pageSize, opponents = [] }, extraParams = '') => {
  let grapplerStr = `grappler=${grappler}`
  let pageStr = `&page=${page}`
  let tagsStr = tags.length ? tags.reduce((result, tag) => `${result}&tag=${tag}`, '') : ''
  let opponentStr = opponents.length ? opponents.reduce((result, opp) => `${result}&opponent=${opp}`, '') : ''
  let pageSizeStr = pageSize ? `&page_size=${pageSize}` : ''
  return `?${grapplerStr}${pageStr}${pageSizeStr}${tagsStr}${opponentStr}${extraParams}`
}
