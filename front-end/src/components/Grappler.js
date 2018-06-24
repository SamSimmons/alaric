import React, { Component } from 'react';
import Profile from './Profile'
import ClipsList from './ClipsList'
import { connect } from 'react-redux'
import { getClips, getGrappler, clearGrappler } from '../actions'
import { withRouter } from 'react-router-dom'

class Grappler extends Component {

  componentDidMount() {
    const { grappler, id, getClips, getGrappler } = this.props
    if (!grappler) {
      getGrappler(id)
    }
    getClips(id)
  }

  componentWillUnmount() {
    const { clearGrappler } = this.props
    clearGrappler()
  }

  render () {
    const { grappler } = this.props
    return (
      <div className="body">
        <Profile {...grappler} />
        <ClipsList />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.grappler
  return {
    id,
    grappler: state.grapplers.selected,
    clips: state.clips.list,
    loading: (state.grapplers.loading || state.clips.loading)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (id) => dispatch(getClips(id)),
    getGrappler: (id) => dispatch(getGrappler(id)),
    clearGrappler: () => dispatch(clearGrappler()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Grappler)
)
