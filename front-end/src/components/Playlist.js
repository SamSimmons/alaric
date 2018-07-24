import React, { Component } from 'react'
import Filter from './Filter'
import ClipsList from './ClipsList'
import { connect } from 'react-redux'

class PlaylistViewer extends Component {

  render() {
    return (
      <div>
        <div>
          {
            list.map((item) => <div>{item}</div>)
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const playlist = state.playlist.list
  return {
    playlist
  }
}

export default connect(mapStateToProps)(PlaylistViewer)
