import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getClips } from '../../actions'
import './pagination.css'

class Pagination extends Component {
  requestClips = (page) => {
    const { getClips } = this.props
    console.log('🐍', page)
    getClips({ page })
  }
  render() {
    const { currentPage } = this.props
    const prevEnabled = currentPage > 1
    return (
      <div className='page-controls'>
        <div
          className={`page-btn ${prevEnabled ? '' : 'page-btn--disabled'}`}
          onClick={() => {
            if (prevEnabled) {
              this.requestClips(currentPage - 1)}
            }
          }
        >Prev</div>
        <div className='page-btn'>{currentPage}</div>
        <div
          className='page-btn'
          onClick={() => this.requestClips(currentPage + 1)}
        >Next</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPage: state.clips.currentPage,
  }
}

const mapStateToDispatch =(dispatch) => {
  return {
    getClips: (params) => dispatch(getClips(params)),
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(Pagination)
