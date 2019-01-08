import React, { useRef, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { get } from 'lodash'
import Editing from './Editing'
import Info from './Info'

const Clip = (props) => {
  const video = useRef()
  const { history } = props
  const { id } = props.match.params
  const [editing, toggleEditing] = useState(false)

  const [clip, setClip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setError] = useState(null)

  useEffect(() => {
    axios.get(`/api/clips/${id}/`)
      .then(({ data }) => {
        setClip(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (err) {
    return <h1>ERROR!</h1>
  }

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
          ? <Editing clip={clip} toggleEditing={toggleEditing} update={setClip} />
          : <Info clip={clip} toggleEditing={toggleEditing} history={history} />
      }
    </div>
  )
}

export default withRouter(Clip)
