import React, { useContext } from 'react'
import { FilterContext } from '../App'
import { getQueryParams } from '../../utils'
import { clipsCache } from '../ClipsList'
import './pagination.css'

const Pagination = () => {

  const { filterValues, filterSetters } = useContext(FilterContext)
  const { updatePage } = filterSetters
  const { page } = filterValues

  const { next } = clipsCache.read(getQueryParams(filterValues))

  const prevEnabled = page > 1
  const nextEnabled = next !== null

  return (
    <div className='page-controls'>
      <div
        className={`page-btn ${prevEnabled ? '' : 'page-btn--disabled'}`}
        onClick={() => updatePage(page - 1)}
      >Prev</div>
    <div className='page-btn'>{page}</div>
      <div
        className={`page-btn ${nextEnabled ? '' : 'page-btn--disabled'}`}
        onClick={() => updatePage(page + 1)}
      >Next</div>
    </div>
  )
}

export default Pagination;
