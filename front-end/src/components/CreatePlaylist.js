import React, { Component } from 'react'
import Filter from './Filter'
import ClipsList from './ClipsList'
import { connect } from 'react-redux'

class CreatePlaylist extends Component {

  render() {
    const { params } = this.props
    return (
      <div style={{ display: 'flex' }}>
        <Filter />
        <ClipsList params={params} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { grappler, selectedTags } = state.filters
  return {
    params: {
      grappler,
      tags: selectedTags,
    }
  }
}

export default connect(mapStateToProps)(CreatePlaylist)
