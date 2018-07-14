import React, { Component } from 'react'
import Filter from './Filter'
import ClipsList from './ClipsList'

class CreatePlaylist extends Component {

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Filter />
        <ClipsList />
      </div>
    )
  }
}

export default CreatePlaylist
