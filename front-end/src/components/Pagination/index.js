import React, { useContext } from 'react'
import { Context } from '../App'
import './pagination.css'

const Pagination = () => {
  const { filterValues, filterSetters, next } = useContext(Context)
  const { updatePage } = filterSetters
  const { page } = filterValues

  const prevEnabled = page > 1
  const nextEnabled = next !== null

  return (
    <div className='page-controls'>
      <div
        className={`page-btn ${prevEnabled ? '' : 'page-btn--disabled'}`}
        onClick={() => {
          if (prevEnabled) {
            updatePage(page - 1)
          }
        }}
      >Prev</div>
      <div className='page-btn'>{page}</div>
      <div
        className={`page-btn ${nextEnabled ? '' : 'page-btn--disabled'}`}
        onClick={() => {
          if (nextEnabled) {
            updatePage(page + 1)
          }
        }}
      >Next</div>
    </div>
  )
}

export default Pagination
