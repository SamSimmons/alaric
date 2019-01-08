import React, { useState, useContext } from 'react'
import Select from 'react-select'
import axios from 'axios'
import { Context } from '../App'
import CreatableSelect from 'react-select/lib/Creatable'
import { find, get } from 'lodash'
import { opponentCache, grapplerCache, tagsCache } from '../Filter'

const createSelectValue = (val = '') => ({ value: val, label: val })

const Editing = ({ clip, toggleEditing, id, update }) => {
  const opponents = opponentCache.read()
  const grapplers = grapplerCache.read()
  const tagOptions = tagsCache.read().map(({ name }) => name)
  const { cacheKey, setCache } = useContext(Context)

  const [ grapplerId, updateGrapplerId ] = useState(clip.grappler)
  const [ opponentId, updateOpponentId ] = useState(clip.opponent)
  const [ tagsList, updateTagList ] = useState(clip.tags)

  const selected = find(grapplers, ({ id }) => {
    return id === grapplerId
  })

  return (
    <div className='clip__info clip__info--editing'>
      <div className='fieldset'>
        <label className='label section-title' htmlFor='grappler'>Grappler</label>
        <Select
          name='grappler'
          clearable={false}
          value={selected ? { value: selected.id, label: selected.name } : null}
          options={grapplers.map(({ id, name }) => ({ value: id, label: name }))}
          onChange={(selected) => updateGrapplerId(selected.value)}
        />
      </div>
      <div className='fieldset'>
        <label className='label section-title' htmlFor='opponent'>Opponent</label>
        <CreatableSelect
          name='opponent'
          isClearable
          placeholder='Opponent'
          value={createSelectValue(opponentId)}
          options={opponents.map(createSelectValue)}
          onChange={(selectItem) => updateOpponentId(get(selectItem, 'value', ''))}
        />
      </div>
      <div className='fieldset'>
        <label className='label section-title' htmlFor='tags'>Tags</label>
        <CreatableSelect
          name='tags'
          placeholder='Tags'
          value={tagsList.map(createSelectValue)}
          options={tagOptions.map(createSelectValue)}
          isMulti
          formatCreateLabel={(label) => label}
          onChange={(selected) => updateTagList(selected.map(({ value }) => value))}
        />
      </div>
      <div>
        <button className='btn btn--secondary' onClick={() => toggleEditing(false)}>Cancel</button>
        <button className='btn' onClick={() => {
          const data = {
            grappler: grapplerId,
            opponent: opponentId,
            tags: tagsList
          }
          axios.patch(`/api/clips/${clip.id}/`, data)
            .then(({ data }) => update(data))

          setCache(cacheKey + 1)
          toggleEditing(false)
        }}>Save</button>
      </div>
    </div>
  )
}

export default Editing
