import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getClip, deleteClip, getGrapplers, updateClip, getOpponents } from '../../actions'
import Heart from '../Icons/Heart'
import Select from 'react-select'
// import Overlay from '../Overlay'
import Creatable from 'react-select/lib/Creatable'
import { find, get } from 'lodash'

 const createSelectValue = (val) => ({ value: val, label: val })

class Clip extends Component {

  video = React.createRef()

  state = {
    liked: false,
    editing: false,
    opponent: '',
    grappler: null,
    tags: get(this.props.clip, 'tags', []),
  }

  componentDidUpdate(prevProps) {
    if (this.props.clip === 'err') {
      return
    }
    const { id } = this.props.match.params
    if (+id !== get(this.props.clip, 'id') && !this.props.loading) {
      const { getClip } = this.props
      getClip(id)
    }
    if (get(prevProps, 'clip.id') !== get(this.props, 'clip.id')) {
      this.setState({
        tags: get(this.props.clip, 'tags', []).map(createSelectValue),
        opponent: createSelectValue(get(this.props.clip, 'opponent', '')),
        grappler: get(this.props.clip, 'grappler', ''),
      })
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const { getClip, grapplers, getGrapplers, getOpponents } = this.props
    getClip(id)
    getOpponents()
    if (grapplers.length === 0) {
      getGrapplers()
    }
  }

  getInfo() {
    const { clip, deleteClip } = this.props
    const { liked } = this.state

    return (
      <div className='clip__info'>
        <div className="clip__meta">
          <Heart liked={liked} handleClick={() => this.setState({ liked: !liked })}  />
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
          style={{ marginRight: "2rem", fontWeight: '700', cursor: 'pointer' }}
          onClick={() => this.setState({ editing: true })}
        >Edit</div>
        <div
          style={{ marginRight: "2rem", fontWeight: '700', cursor: 'pointer' }}
          onClick={() =>  deleteClip(clip.id)}
        >Delete</div>
      </div>
    )
  }

  save = () => {
    const { updateClip, clip } = this.props
    const { opponent, grappler, tags } = this.state
    let data = {
      opponent: opponent.value,
      grappler,
      tags: JSON.stringify(tags.map((t) => t.value)),
    }
    updateClip(clip.id, data)
    this.setState({ editing: false })
  }

  getEditing() {
    const { grapplers, opponents, tagOptions } = this.props
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
          <Creatable
            name="opponent"
            formatCreateLabel={(label) => label}
            isClearable
            placeholder="Opponent"
            value={this.state.opponent}
            options={opponents.map(createSelectValue)}
            onChange={(opponent) => {
              this.setState({ opponent })
            }}
          />
        </div>
        <div className="fieldset">
          <label className="label section-title" htmlFor="tags">Tags</label>
          <Creatable
            name="tags"
            placeholder="Tags"
            formatCreateLabel={(label) => label}
            value={tags}
            options={tagOptions}
            isMulti
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

  handleKey = (e) => {
    const { currentTime, duration } = this.video.current
    const frameTime = 1 / 25;
    if (e.keyCode === 188) {
      this.video.current.currentTime = Math.max(0, currentTime - frameTime)
    } else if (e.keyCode === 190) {
      this.video.current.currentTime = Math.min(duration, currentTime + frameTime)
    }
  }

  render() {
    const { clip } = this.props
    const { editing } = this.state
    // const width = get(this.video, 'current.clientWidth', 0)
    // const height = get(this.video, 'current.clientHeight', 0)

    if (!clip || clip === "err") {
      return <div>ERROR</div>
    }

    return (
      <div className='clip'>
        <video
          ref={this.video}
          className="clip__video"
          src={get(clip, 'video')}
          controls
          onKeyDown={this.handleKey}
        />
          {
            // <Overlay dimensions={{ width, height }} video={this.video} />
          }
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
  const tagOptions = state.filters.tags.map((opt) => ({ label: opt.name, value: opt.name }))
  return {
    clip: state.clips.selected,
    loading: state.clips.loading,
    grapplers: state.grapplers.list,
    opponents: state.opponents.list,
    tagOptions,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClip: (id) => dispatch(getClip(id)),
    deleteClip: (id) => dispatch(deleteClip(id)),
    updateClip: (id, data) => dispatch(updateClip(id, data)),
    getGrapplers: () => dispatch(getGrapplers()),
    getOpponents: () => dispatch(getOpponents()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Clip))
