import React, { useState, Suspense, lazy } from 'react'
import './filter.css'
// import { connect } from 'react-redux'
// import { getTags, updateGrapplerFilter, updateTagFilter, updateOpponentsFilter } from '../../actions'
import { unstable_createResource as createResource } from 'react-cache';
import axios from 'axios'
import { sortBy } from 'lodash';
const SortDropdown = lazy(() => import('./SortDropdown'))


const tagsCache = createResource(() => axios.get(`/api/tags/`).then(({ data }) => data))
const grapplerCache = createResource(() => axios.get(`/api/grapplers/`).then(({ data }) => data))
const opponentCache = createResource(() => axios.get(`/api/opponents/`)
  .then(
    ({ data }) => data
      .map(({ opponent }) => opponent)
      .filter((name) => name !== ''))
  )

const Filter = () => {
  const [ tagsSortOrder, setTagOrder ] = useState('name')
  const tags = sortBy(tagsCache.read(), (item) => {
    if (tagsSortOrder === 'num_times') { return -item[tagsSortOrder]}
    return item[tagsSortOrder]
  })


  const grapplers = sortBy(grapplerCache.read(), ({ name }) => name.split(' ').pop())
  const [ selectedGrappler, updateGrappler ] = useState('All')

  const [ untagged, updateUntagged ] = useState(false)

  const opponents = sortBy(opponentCache.read(), (opponent) => opponent.split(' ').pop())
  const [ selectedOpponents, updateOpponents ] = useState([])
  console.log('🐏', opponents)
  return (
    <div>
      <div className='filter__category'>
        <div className='filter__label'>Grappler</div>
        <div>
          <select
            name='grapplers'
            id='grapplers'
            value={selectedGrappler}
            onChange={(e) => updateGrappler(e.target.value)}
          >
            <option value="All">All</option>
            {
              grapplers.map(
                (g) =>
                  <option
                    key={`grappler-check-${g.id}`}
                    value={g.id}
                  >{g.name}</option>
              )
            }
          </select>
        </div>
      </div>
      <div className='filter__category'>
        <div className='filter__label'>
          <span>Tags</span>
          <SortDropdown
            id='tags'
            options={[
              { value: 'name', label: 'Name' },
              { value: 'num_times', label: 'Popularity' },
            ]}
            update={(val) => setTagOrder(val)}
          />
        </div>
        <div className={`expandable__category expandable__category--expanded`}>
          {
            tags.map(
              (t) =>
                <div key={`tag-check-${t.name}`} style={{ display: 'flex' }}>
                  <input
                    type='checkbox'
                    checked={t.checked}
                    onChange={(e) => console.log('🐝', t.name)}
                  />{t.name}</div>
            )
          }
        </div>
      </div>
      <div className='filter__category'>
        <div className='filter__label'>Opponent</div>
        <div className={`expandable__category expandable__category--expanded`}>
          {
            opponents.map(
              (o) =>
                <div key={`opponent-check-${o}`} style={{ display: 'flex' }}>
                  <input
                    type='checkbox'
                    onChange={(e) => updateOpponents(o)}
                  />{o}</div>
            )
          }
        </div>
      </div>
      <div className='filter__category'>
        <div className='filter__label'>Untagged</div>
        <div>
          <div style={{ display: 'flex' }}>
            <input
              type='checkbox'
              id="untagged"
              checked={untagged}
              onChange={(e) => updateUntagged(!untagged)}
            />
            <label htmlFor='untagged'>Untagged</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
