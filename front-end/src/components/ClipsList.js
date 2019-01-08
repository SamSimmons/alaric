import React, { useContext, lazy } from 'react'
import { Link } from 'react-router-dom'
import { find, get } from 'lodash'
import { Context } from './App'
import { grapplerCache } from './Filter'
const Pagination = lazy(() => import('./Pagination'))

const ClipsList = (props) => {
  const { clips } = useContext(Context)
  const { count, results } = clips
  const grapplers = grapplerCache.read()
  return (
    <div className='clip-list'>
      {
        count === 0
          ? <div className='big inverted'>No matching clips.</div>
          : null
      }
      {results.map(
        (clip) =>
          <Link className='clip-list__container' key={clip.video} to={`/clip/${clip.id}/`}>
            <img className='clip__thumbnail' src={clip.thumbnail} alt='clip preview' />
            <div>
              {get(
                find(grapplers, ({ id }) => clip.grappler === id), 'name'
              )}
            </div>
            <div>{clip.opponent}</div>
            <div>
              {clip.tags.map(
                (t, i) => <span key={`${clip.video}-${i}`}>{`${t}${i === clip.tags.length - 1 ? "" : ", "}`}</span>
              )}
            </div>
          </Link>
      )}
      {
        count
          ? <Pagination />
          : null
      }
    </div>
  )
}

export default ClipsList
