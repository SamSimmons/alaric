import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClips, getGrapplers, addToPlaylist, removeFromPlaylist } from '../actions'
import { find, get, includes } from 'lodash'

class ClipsList extends Component {

  componentDidMount() {
    const { getClips, getGrapplers, grapplers, nextPage, selectedGrappler, tags } = this.props
    getClips({ grappler: get(selectedGrappler, 'id', 'All'), tags, page: nextPage })
    if (!grapplers.length) {
      getGrapplers()
    }
  }

  getNextPage = () => {
    const { getClips, nextPage, params } = this.props
    getClips({ page: nextPage, ...params })
  }

  getPlaylistOptions(clip) {
    const { playlist, addToPlaylist, removeFromPlaylist } = this.props
    if (includes(playlist, clip.id)) {
      return (
        <div
          onClick={(e) => {
            e.preventDefault()
            removeFromPlaylist(clip.id)
          }}
        >Remove</div>
      )
    }
    return (
      <div
        onClick={(e) => {
          e.preventDefault()
          addToPlaylist(clip.id)
        }}
      >Add</div>
    )
  }

  render() {
    const { grapplers, list, nextPage, selectable } = this.props

    return (
      <div className="clip-list">
        {list.map(
          (clip) =>
          <Link className="clip-list__container" key={clip.video} to={`/clip/${clip.id}/`}>
            {
              selectable
              ? this.getPlaylistOptions(clip)
              : null
            }
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
    selectedGrappler: get(state.grapplers, 'selected.id'),
    playlist: state.playlist.list,
    tags: state.filters.selectedTags,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (params) => dispatch(getClips(params)),
    getGrapplers: () => dispatch(getGrapplers()),
    addToPlaylist: (id) => dispatch(addToPlaylist([id])),
    removeFromPlaylist: (id) => dispatch(removeFromPlaylist([id])),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClipsList)
