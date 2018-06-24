import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getClips, deleteClip } from '../actions'
import Loader from './Loader'
import { find } from 'lodash'

class Clip extends Component {

  componentDidMount() {
    const { fetchClips, getClips } = this.props
    if (fetchClips) {
      const { grappler } = this.props.match.params
      getClips(grappler)
    }
  }

  render() {
    const { loading } = this.props
    if (loading) {
      return <Loader />
    }

    const { id } = this.props.match.params
    const { list, deleteClip } = this.props
    const clip = find(list, ['id', +id])
    if (!clip) { return null }
    return (
      <div>
        <video className="clip__video" src={clip.video} controls />
        <button onClick={() => {
          deleteClip(clip.id)
        }}>DELETE</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetchClips: !state.clips.list.length,
    list: state.clips.list,
    loading: state.clips.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (id) => dispatch(getClips(id)),
    deleteClip: (id) => dispatch(deleteClip(id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clip))
