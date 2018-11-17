import React, { useState, Suspense, lazy } from 'react'
import './filter.css'
import { unstable_createResource as createResource } from 'react-cache';
import axios from 'axios'
import { sortBy, includes } from 'lodash';
const SortDropdown = lazy(() => import('./SortDropdown'))

export const tagsCache = createResource(() => axios.get(`/api/tags/`).then(({ data }) => data))
export const grapplerCache = createResource(() => axios.get(`/api/grapplers/`).then(({ data }) => data))
export const opponentCache = createResource(() => axios.get(`/api/opponents/`)
  .then(
    ({ data }) => data
      .map(({ opponent }) => opponent)
      .filter((name) => name !== ''))
  )

const Filter = (props) => {
  const {
    selectedTags,
    updateTags,
    selectedGrappler,
    updateGrappler,
    untagged,
    updateUntagged,
    selectedOpponents,
    updateOpponents,
  } = props

  const [ tagsSortOrder, setTagOrder ] = useState('name')

  const tags = sortBy(tagsCache.read(), (item) => {
    if (tagsSortOrder === 'num_times') { return -item[tagsSortOrder]}
    return item[tagsSortOrder]
  })
  const grapplers = sortBy(grapplerCache.read(), ({ name }) => name.split(' ').pop())
  const opponents = sortBy(opponentCache.read(), (opponent) => opponent.split(' ').pop())

  return (
    <Suspense fallback={<h1>FILTER...</h1>}>
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
              (t) => {
                const checked = includes(selectedTags, t.name)
                return (
                  <div key={`tag-check-${t.name}`} style={{ display: 'flex' }}>
                    <input
                      type='checkbox'
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          const nextTags = selectedTags.filter((tag) => tag !== t.name)
                          updateTags(nextTags);
                        } else {
                          const nextTags = selectedTags.concat(t.name);
                          updateTags(nextTags);
                        }
                      }}
                      />{t.name}</div>
                  )
                }
              )
            }
          </div>
        </div>
        <div className='filter__category'>
          <div className='filter__label'>Opponent</div>
          <div className={`expandable__category expandable__category--expanded`}>
            {
              opponents.map(
                (name) => {
                  const checked = includes(selectedOpponents, name)
                  return (
                    <div key={`opponent-check-${name}`} style={{ display: 'flex' }}>
                      <input
                        type='checkbox'
                        checked={checked}
                        onChange={() => {
                          if (checked) {
                            const nextOpponents = selectedOpponents.filter((opponent) => opponent !== name)
                            updateOpponents(nextOpponents)
                          } else {
                            const nextOpponents = selectedOpponents.concat(name)
                            updateOpponents(nextOpponents)
                          }
                        }}
                        />{name}</div>
                    )
                  }
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
        </Suspense>
  )
}

export default Filter
