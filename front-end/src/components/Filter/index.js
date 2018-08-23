import React, { Component } from 'react'
import Up from 'typicons.font/src/svg/arrow-sorted-up.svg'
import Down from 'typicons.font/src/svg/arrow-sorted-down.svg'
import './filter.css'
import { connect } from 'react-redux'
import { getTags, updateGrapplerFilter, updateTagFilter, updateOpponentsFilter } from '../../actions'


class Filter extends Component {

  state = {
    tagsCollapsed: true,
    opponentsCollapsed: true,
  }

  componentDidMount() {
    const { getTags } = this.props
    getTags()
  }

  render() {
    const { grapplers, tags, untagged, opponents, selectedGrappler, updateGrapplerFilter, updateTagFilter, updateOpponentsFilter } = this.props
    const { tagsCollapsed, opponentsCollapsed } = this.state
    const displayedTags = tagsCollapsed ? tags.slice(0, 5) : tags
    const displayedOpponents = opponentsCollapsed ? opponents.slice(0, 5) : opponents
    return (
      <div>
        <div className='filter__category'>
          <div className='filter__label'>Grappler</div>
          <div>
            <select
              name='grapplers'
              id='grapplers'
              value={selectedGrappler}
              onChange={(e) => updateGrapplerFilter(e.target.value)}
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
          <div className='filter__label'>Tags</div>
          <div className={`expandable__category ${tagsCollapsed ? '' : 'expandable__category--expanded'}`}>
            {
              displayedTags.map(
                (t) =>
                  <div key={`tag-check-${t.name}`} style={{ display: 'flex' }}>
                    <input
                      type='checkbox'
                      checked={t.checked}
                      onChange={(e) => updateTagFilter(t.name)}
                    />{t.name}</div>
              )
            }
          </div>
          {
            tagsCollapsed
            ? <div className='filter-btn' onClick={() => this.setState({ tagsCollapsed: false })}>More <Down /></div>
            : <div className='filter-btn' onClick={() => this.setState({ tagsCollapsed: true })}>Less <Up /></div>
          }
        </div>
        <div className='filter__category'>
          <div className='filter__label'>Opponent</div>
          <div className={`expandable__category ${opponentsCollapsed ? '' : 'expandable__category--expanded'}`}>
            {
              displayedOpponents.map(
                (o) =>
                  <div key={`opponent-check-${o.name}`} style={{ display: 'flex' }}>
                    <input
                      type='checkbox'
                      checked={o.checked}
                      onChange={(e) => updateOpponentsFilter(o.name)}
                    />{o.name}</div>
              )
            }
          </div>
          {
            opponentsCollapsed
            ? <div className='filter-btn' onClick={() => this.setState({ opponentsCollapsed: false })}>More <Down /></div>
            : <div className='filter-btn' onClick={() => this.setState({ opponentsCollapsed: true })}>Less <Up /></div>
          }
        </div>
        <div className='filter__category'>
          <div className='filter__label'>Untagged</div>
          <div>
            <div style={{ display: 'flex' }}>
              <input
                type='checkbox'
                id="untagged"
                checked={untagged}
                onChange={(e) => updateTagFilter('untagged')}
              />
              <label htmlFor='untagged'>Untagged</label>
            </div>
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.filters.tags,
    grapplers: state.grapplers.list,
    opponents: state.filters.opponents,
    selectedGrappler: state.filters.grappler,
    untagged: state.filters.untagged,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => dispatch(getTags()),
    updateGrapplerFilter: (id) => dispatch(updateGrapplerFilter(id)),
    updateTagFilter: (tag) => dispatch(updateTagFilter(tag)),
    updateOpponentsFilter: (opponent) => dispatch(updateOpponentsFilter(opponent)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
