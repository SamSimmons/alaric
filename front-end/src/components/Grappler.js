import React, { Component } from 'react';
import Profile from './Profile'
import ClipsList from './ClipsList'
import { connect } from 'react-redux'
import { getClips } from '../actions'

const grappler = {
  name: "Gordon Ryan",
  clips: 14,
  avatar: "https://instagram.fakl4-1.fna.fbcdn.net/vp/0bd31aa0ff39ac651ef46dd8a4c403fe/5BA37508/t51.2885-19/s150x150/21372273_2037724493180894_6034611763083739136_a.jpg",
  options: ["Sweeps", "Takedowns", "Submissions", "Passes"]
}

class Grappler extends Component {

  componentDidMount() {
    const { getClips } = this.props
    getClips(1)
  }

  render () {
    return (
      <div className="body">
        <Profile {...grappler} />
        <ClipsList />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clips: state.clips.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (id) => dispatch(getClips(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grappler)
