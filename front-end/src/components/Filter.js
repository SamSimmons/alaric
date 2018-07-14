import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTags, getGrapplers, updateGrapplerFilter, updateTagFilter } from '../actions'


class Filter extends Component {

  componentDidMount() {
    const { getTags, getGrapplers } = this.props
    getTags()
    getGrapplers()
  }

  render() {
    const { grapplers, tags, selectedGrappler, updateGrapplerFilter, updateTagFilter } = this.props
    return (
      <div>
        <div>Grapplers</div>
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
        <div>Tags</div>
        <div>
          {
            tags.map(
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.filters.tags,
    grapplers: state.grapplers.list,
    selectedGrappler: state.filters.grappler,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTags: () => dispatch(getTags()),
    getGrapplers: () => dispatch(getGrapplers()),
    updateGrapplerFilter: (id) => dispatch(updateGrapplerFilter(id)),
    updateTagFilter: (tag) => dispatch(updateTagFilter(tag)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
