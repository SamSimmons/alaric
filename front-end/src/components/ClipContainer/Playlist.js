import React, { lazy, useContext } from 'react'
import { Link } from 'react-router-dom'
import { getQueryParams } from '../../utils'
import { clipsCache } from '../ClipsList'
import { FilterContext } from '../App'
const Pagination = lazy(() => import('../Pagination'))

const Playlist = (props) => {
  const { filterValues } = useContext(FilterContext)
  const filterParams = getQueryParams(filterValues)
  const { count, results: clips } = clipsCache.read(filterParams)

  const getTagString = (tags) => {
    const withCommas = tags.slice(0, 3).reduce((str, tag, i) => {
      if (i === tags.length - 1) {
        return `${str} ${tag}`
      }
      return `${str} ${tag},`
    }, '')
    return withCommas
  }

  return (
    <div className="playlist">
      {
        clips.map(({ id, thumbnail, grappler_name, tags }) => {
          return (
            <Link className="playlist__clip" key={id} to={`/clip/${id}/`}>
                <img src={thumbnail} alt='preview' />
                <div className='playlist__overlay'>
                  <div className='name'>{grappler_name}</div>
                  <div className='tags'>{getTagString(tags)}</div>
                </div>
            </Link>
          )
        })
      }
      {
        count
        ? <Pagination />
        : null
      }
    </div>
  )
}

export default Playlist
