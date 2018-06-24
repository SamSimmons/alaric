import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClip } from '../actions'

const ClipsList = (props) => {
  return (
    <div>
      {props.list.map(
        (clip) =>
          <div className="clip__container" key={clip.video}>
            <video className="clip__video" src={clip.video} controls />
            <Link to={`/${clip.grappler}/clip/${clip.id}/`}>{clip.video}</Link>
          </div>
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    list: state.clips.list
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    getClip: (url) => dispatch(getClip(url))
  }
}

export default connect(mapStateToProps, mapActionsToProps)(ClipsList)
