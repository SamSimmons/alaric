
export const getQueryParams = ({ selectedGrappler = "All", selectedTags = [], page = 1, pageSize, selectedOpponents = [], untagged = false }, extraParams = '') => {
  let grapplerStr = `grappler=${selectedGrappler}`
  let pageStr = `&page=${page}`
  let tagsStr = selectedTags.length ? selectedTags.reduce((result, tag) => `${result}&tag=${tag}`, '') : ''
  if (untagged) {
    tagsStr = '&tag=untagged'
  }
  let opponentStr = selectedOpponents.length ? selectedOpponents.reduce((result, opp) => `${result}&opponent=${opp}`, '') : ''
  let pageSizeStr = pageSize ? `&page_size=${pageSize}` : ''
  return `?${grapplerStr}${pageStr}${pageSizeStr}${tagsStr}${opponentStr}${extraParams}`
}
