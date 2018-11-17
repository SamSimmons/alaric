import React, { useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
// import { getClip, deleteClip, getGrapplers, updateClip, getOpponents } from '../../actions'
import Heart from '../Icons/Heart'
import Select from 'react-select'
import axios from 'axios'
import CreatableSelect from 'react-select/lib/Creatable'
import { find, get } from 'lodash'
import { unstable_createResource as createResource } from 'react-cache';
import { opponentCache, grapplerCache, tagsCache } from '../Filter'

const clipCache = createResource((id) => axios.get(`/api/clips/${id}/`).then(({ data }) => data))

const Clip = (props) => {
  const video = useRef()
  const { history } = props
  const { id } = props.match.params
  const clip = clipCache.read(id)

  const [editing, toggleEditing] = useState(false)

  const [ grapplerId, updateGrapplerId ] = useState(clip.grappler)
  const [ opponentId, updateOpponentId ] = useState(clip.opponent)
  const [ tagsList, updateTagList ] = useState(clip.tags)
  const [ liked, toggleLike ] = useState(false)


  const handleKey = (e) => {
    const { currentTime, duration } = video.current
    const frameTime = 1 / 25;
    if (e.keyCode === 188) {
      video.current.currentTime = Math.max(0, currentTime - frameTime)
    } else if (e.keyCode === 190) {
      video.current.currentTime = Math.min(duration, currentTime + frameTime)
    }
  }

  return (
    <div className='clip'>
      <video
         ref={video}
         className="clip__video"
         src={get(clip, 'video')}
         controls
         onKeyDown={handleKey}
       />
       {
         editing
         ? getEditing(toggleEditing, grapplerId, updateGrapplerId, opponentId, updateOpponentId, tagsList, updateTagList, id)
         : getInfo(clip, toggleEditing, liked, toggleLike, history)
       }
    </div>
  )
}

const getInfo = (clip, toggleEditing, liked, toggleLike, history) => {

  return (
    <div className='clip__info'>
      <div className="clip__meta">
        <Heart liked={liked} handleClick={() => toggleLike(!liked)} />
        <div className="clip__text">{clip.opponent}</div>
        <div className="clip__tags">
          {
            clip.tags.map(
              (tag, i) =>
                <span
                  className="tag"
                  key={`tag-${clip.id}-${i}`}
                >{`${tag}${i === clip.tags.length - 1 ? " " : ", "}`}</span>
              )
          }
        </div>
      </div>
      <div
        className='clip__btn'
        onClick={() => toggleEditing(true)}
      >Edit</div>
      <div
        className='clip__btn'
        onClick={() => {
          axios.delete(`/api/clips/${clip.id}/`)
          history.push('/')
        }}
      >Delete</div>
    </div>
  )
}

const getEditing = (toggleEditing, grapplerId, updateGrapplerId, opponentId, updateOpponentId, tagsList, updateTagList, clipId) => {
  const opponents = opponentCache.read()
  const grapplers = grapplerCache.read()
  const tagOptions = tagsCache.read().map(({ name }) => name)

  const selected = find(grapplers, ({ id }) => {
    return id === grapplerId
  })

  return (
    <div className='clip__info clip__info--editing'>
      <div className="fieldset">
        <label className="label section-title" htmlFor="grappler">Grappler</label>
        <Select
          name="grappler"
          clearable={false}
          value={selected ? { value: selected.id, label: selected.name} : null}
          options={grapplers.map(({ id, name }) => ({ value: id, label: name }))}
          onChange={(selected) => updateGrapplerId(selected.value)}
        />
      </div>
      <div className="fieldset">
        <label className="label section-title" htmlFor="opponent">Opponent</label>
        <CreatableSelect
          name="opponent"
          isClearable
          placeholder="Opponent"
          value={createSelectValue(opponentId)}
          options={opponents.map(createSelectValue)}
          onChange={(selectItem) => updateOpponentId(get(selectItem, 'value', ''))}
        />
      </div>
      <div className="fieldset">
        <label className="label section-title" htmlFor="tags">Tags</label>
        <CreatableSelect
          name="tags"
          placeholder="Tags"
          value={tagsList.map(createSelectValue)}
          options={tagOptions.map(createSelectValue)}
          isMulti
          formatCreateLabel={(label) => label}
          onChange={(selected) => updateTagList(selected.map(({ value }) => value))}
        />
      </div>
      <div>
        <button className="btn btn--secondary" onClick={() => toggleEditing(false)}>Cancel</button>
        <button className='btn' onClick={()=> {
            const data = {
              grappler: grapplerId,
              opponent: opponentId,
              tags: tagsList,
            }
            axios.patch(`/api/clips/${clipId}/`, data)
            toggleEditing(false)
          }}>Save</button>
      </div>
    </div>
  )
}

const createSelectValue = (val = '') => ({ value: val, label: val })

export default withRouter(Clip)
