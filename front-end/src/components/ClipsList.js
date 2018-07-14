import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClips, getGrapplers } from '../actions'
import { find, get } from 'lodash'

class AllClips extends Component {

  componentDidMount() {
    const { getClips, getGrapplers, grapplers, nextPage, selectedGrappler } = this.props
    getClips({ grappler: get(selectedGrappler, 'id', 'All'), page: nextPage })
    if (!grapplers.length) {
      getGrapplers()
    }
  }

  getNextPage = () => {
    const { getClips, nextPage } = this.props
    getClips({ page: nextPage })
  }

  render() {
    const { grapplers, list, nextPage } = this.props

    return (
      <div className="clip-list">
        {list.map(
          (clip) =>
          <Link className="clip-list__container" key={clip.video} to={`/${clip.grappler}/clip/${clip.id}/`}>
            <img className="clip__thumbnail" src={clip.thumbnail} alt="clip preview" />
            <div>{find(grapplers, ({ id }) => clip.grappler === id).name}</div>
            <div>{clip.opponent}</div>
            <div>
              {clip.tags.map(
                (t, i) => <span key={`${clip.video}-${i}`}>{t}</span>
              )}
            </div>
          </Link>
        )}
        {
          nextPage
          ? <button onClick={this.getNextPage} className="btn">Load more</button>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.clips.list,
    grapplers: state.grapplers.list,
    nextPage: state.clips.nextPage,
    total: state.clips.total,
    selectedGrappler: get(state.grapplers, 'selected.id')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (params) => dispatch(getClips(params)),
    getGrapplers: () => dispatch(getGrapplers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllClips)
