import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClips, getGrapplers, getOpponents, addToPlaylist, removeFromPlaylist } from '../actions'
import { find, get } from 'lodash'
import Pagination from './Pagination/index'

class ClipsList extends Component {

  componentDidMount() {
    const { getClips, getOpponents, getGrapplers } = this.props
    getClips()
    getOpponents()
    getGrapplers()
  }

  render() {
    const { grapplers, list } = this.props
    return (
      <div className="clip-list">
        {list.map(
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
                (t, i) => <span key={`${clip.video}-${i}`}>{t}</span>
              )}
            </div>
          </Link>
        )}
        <Pagination />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.clips.list,
    grapplers: state.grapplers.list,
    total: state.clips.total,
    selectedGrappler: get(state.grapplers, 'selected.id'),
    playlist: state.playlist.list,
    tags: state.filters.selectedTags,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (params, extraParams) => dispatch(getClips(params, extraParams)),
    getGrapplers: () => dispatch(getGrapplers()),
    getOpponents: () => dispatch(getOpponents()),
    addToPlaylist: (id) => dispatch(addToPlaylist([id])),
    removeFromPlaylist: (id) => dispatch(removeFromPlaylist([id])),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipsList)
