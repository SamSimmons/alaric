import React, { useContext, lazy } from 'react'
import { unstable_createResource as createResource } from 'react-cache';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { find, get } from 'lodash'
import { FilterContext } from './App'
import { getQueryParams } from '../utils'
import { grapplerCache } from './Filter'
const Pagination = lazy(() => import('./Pagination'))

const clipsCache = createResource((params) => axios.get(`/api/clips/${params}`).then(({ data }) => data))

const ClipsList = (props) => {
  const filters = useContext(FilterContext)
  const filterParams = getQueryParams(filters)
  const { count, results: clips } = clipsCache.read(filterParams)
  const grapplers = grapplerCache.read()
  return (
    <div className="clip-list">
      {
        count === 0
        ? <div className='big inverted'>No matching clips.</div>
        : null
      }
      {clips.map(
        (clip) =>
        <Link className="clip-list__container" key={clip.video} to={`/clip/${clip.id}/`}>
          <img className="clip__thumbnail" src={clip.thumbnail} alt="clip preview" />
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
