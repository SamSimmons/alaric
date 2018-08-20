import React, { Component } from 'react';
import Profile from './Profile'
import ClipsList from './ClipsList'
import { connect } from 'react-redux'
import { getClips, getGrappler, clearGrappler, getTags } from '../actions'
import { withRouter } from 'react-router-dom'
import { getQueryParams } from '../utils'

class Grappler extends Component {

  componentDidMount() {
    const { grappler, id, getClips, getTags, getGrappler, nextPage, selectedTag } = this.props
    if (!grappler) {
      getGrappler(id)
    }
    getClips({ grappler: id, page: nextPage, tags: [selectedTag] })
    getTags(getQueryParams({ grappler: id }))
  }

  componentDidUpdate(oldProps) {
    if (oldProps.selectedTag !== this.props.selectedTag) {
      const { id, getClips, nextPage, selectedTag } = this.props
      getClips({ grappler: id, page: nextPage, tags: [selectedTag] })
    }
  }

  componentWillUnmount() {
    const { clearGrappler } = this.props
    clearGrappler()
  }

  render () {
    const { grappler, total, id } = this.props
    return (
      <div>
        <Profile {...grappler} total={total} />
        <ClipsList params={{ grappler: id }} />
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
    selectedTag: state.profile.selectedTag,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (params) => dispatch(getClips(params)),
    getTags: (id) => dispatch(getTags(id)),
    getGrappler: (id) => dispatch(getGrappler(id)),
    clearGrappler: () => dispatch(clearGrappler()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Grappler)
)
