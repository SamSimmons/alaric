import React, { Component } from 'react';
import Profile from './Profile'
import ClipsList from './ClipsList'
import { connect } from 'react-redux'
import { getClips, getGrappler, clearGrappler } from '../actions'
import { withRouter } from 'react-router-dom'

class Grappler extends Component {

  componentDidMount() {
    const { grappler, id, getClips, getGrappler, nextPage } = this.props
    if (!grappler) {
      getGrappler(id)
    }
    getClips({ grappler: id, page: nextPage })
  }

  componentWillUnmount() {
    const { clearGrappler } = this.props
    clearGrappler()
  }

  render () {
    const { grappler, total } = this.props
    return (
      <div>
        <Profile {...grappler} total={total} />
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
    loading: (state.grapplers.loading || state.clips.loading),
    nextPage: state.clips.nextPage,
    total: state.clips.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (params) => dispatch(getClips(params)),
    getGrappler: (id) => dispatch(getGrappler(id)),
    clearGrappler: () => dispatch(clearGrappler()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Grappler)
)
