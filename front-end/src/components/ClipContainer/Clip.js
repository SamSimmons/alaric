import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { get } from 'lodash'
import { unstable_createResource as createResource } from 'react-cache'
import Editing from './Editing'
import Info from './Info'

const clipCache = createResource((id) => axios.get(`/api/clips/${id}/`).then(({ data }) => data))

const Clip = (props) => {
  const video = useRef()
  const { history } = props
  const { id } = props.match.params
  const clip = clipCache.read(id)
  const [editing, toggleEditing] = useState(false)

  const handleKey = (e) => {
    const { currentTime, duration } = video.current
    const frameTime = 1 / 25
    if (e.keyCode === 188) {
      video.current.currentTime = Math.max(0, currentTime - frameTime)
    } else if (e.keyCode === 190) {
      video.current.currentTime = Math.min(duration, currentTime + frameTime)
    }
  }

  return (
    <div className='clip'>
      <div style={{ fontWeight: '700' }}>ID: {id}</div>
      <video
        ref={video}
        className='clip__video'
        src={get(clip, 'video')}
        controls
        onKeyDown={handleKey}
      />
      {
        editing
          ? <Editing clip={clip} toggleEditing={toggleEditing} />
          : <Info clip={clip} toggleEditing={toggleEditing} history={history} />
      }
    </div>
  )
}

export default withRouter(Clip)
