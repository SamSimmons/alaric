import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getClip, deleteClip, getGrapplers, updateClip } from '../actions'
import Loader from './Loader'
import Heart from './Icons/Heart'
import DropdownMenu from './DropdownMenu'
import Select from 'react-select'
import { tagOptions } from '../constants'
import { find } from 'lodash'

class Clip extends Component {
  state = {
    liked: false,
    editing: false,
    opponent: '',
    grappler: null,
    tags: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.clip && !prevState.grappler) {
      return {
        grappler: nextProps.clip.grappler,
        opponent: nextProps.clip.opponent,
        tags: nextProps.clip.tags
      }
    } else {
      return null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { getClip, grapplers, getGrapplers } = this.props
    getClip(id)
    if (grapplers.length === 0) {
      getGrapplers()
    }
  }

  getInfo() {
    const { clip } = this.props
    const { liked } = this.state

    return (
      <div className='clip__info'>
        <div className="clip__meta">
          <Heart liked={liked} handleClick={() => this.setState({ liked: !liked })}  />
          <div className="clip__text">{clip.opponent}</div>
          <div className="clip__tags">
            {
              clip.tags.map((tag, i) => <span className="tag" key={`tag-${clip.id}-${i}`}>{`${tag}${i === clip.tags.length - 1 ? "" : ", "}`}</span>)
            }
          </div>
        </div>
        <DropdownMenu
          options={[
            { label: "Edit", action: () => this.setState({ editing: true }) },
            { label: "Delete", action: () => console.log("delete") }
          ]}
        />
      </div>
    )
  }

  save = () => {
    const { updateClip, clip } = this.props
    const { opponent, grappler, tags } = this.state
    let data = {
      opponent,
      grappler,
      tags: JSON.stringify(tags.map(t => t.value))
    }

    updateClip(clip.id, data)
    this.setState({ editing: false })
  }

  getEditing() {
    const { clip, grapplers } = this.props
    const { grappler, tags } = this.state
    const selected = find(grapplers, ({ id }) => id === grappler)
    return (
      <div className='clip__info clip__info--editing'>
        <div className="fieldset">
          <label className="label section-title" htmlFor="grappler">Grappler</label>
          <Select
            name="grappler"
            clearable={false}
            value={selected ? { value: selected.id, label: selected.name} : null}
            options={grapplers.map(({ id, name }) => ({ value: id, label: name }))}
            onChange={(selected) => {
              this.setState({ grappler: selected.value })
            }}
          />
        </div>
        <div className="fieldset">
          <label className="label section-title" htmlFor="opponent">Opponent</label>
          <input
            id="opponent"
            className="input"
            value={clip.opponent}
            onChange={(e) => this.setState({ opponent: e.target.value })}
          />
        </div>
        <div className="fieldset">
          <label className="label section-title" htmlFor="tags">Tags</label>
          <Select
            name="tags"
            value={tags}
            options={tagOptions}
            multi={true}
            onChange={(selected) => {
              this.setState({ tags: selected })
            }}
          />
        </div>
        <div>
          <button className="btn btn--secondary" onClick={() => this.setState({ editing: false })}>Cancel</button>
          <button className='btn' onClick={this.save}>Save</button>
        </div>
      </div>
    )
  }

  render() {
    const { loading, clip } = this.props
    const { editing } = this.state

    if (loading) {
      return <Loader />
    }

    if (!clip || clip === "err") {
      return <div>ERROR</div>
    }

    return (
      <div className='clip'>
        <video className="clip__video" src={clip.video} controls></video>
        {
          editing
          ? this.getEditing()
          : this.getInfo()
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clip: state.clips.selected,
    loading: state.clips.loading,
    grapplers: state.grapplers.list,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClip: (id) => dispatch(getClip(id)),
    deleteClip: (id) => dispatch(deleteClip(id)),
    updateClip: (id, data) => dispatch(updateClip(id, data)),
    getGrapplers: () => dispatch(getGrapplers()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clip))
