import React, { lazy, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../App'
const Pagination = lazy(() => import('../Pagination'))

const Playlist = (props) => {
  const { clips } = useContext(Context)
  const { count, results } = clips

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
        results.map(({ id, thumbnail, grappler_name, tags }) => {
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
