import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getClips } from '../../actions'
import { Link } from 'react-router-dom'
import { get } from 'lodash'

class Playlist extends Component {

  componentDidMount() {
    const { total, getClips } = this.props
    if (total === null) {
      getClips('&exclude_watched=true')
    }
  }

  componentDidUpdate(oldProps) {
    if (get(oldProps.clip, 'id') !== get(this.props.clip, 'id') && !this.props.loading) {
      const { getClips } = this.props
      getClips('&exclude_watched=true')
    }
  }

  getTagString(tags) {
    const withCommas = tags.slice(0, 3).reduce((str, tag, i) => {
      if (i === tags.length - 1) {
        return `${str} ${tag}`
      }
      return `${str} ${tag},`
    }, '')
    return withCommas
  }

  render() {
    const { clips, loading } = this.props
    if (loading) {
      return null
    }
    return (
      <div className="playlist">
        {
          clips.map((c) => {
            return (
              <Link className="playlist__clip" key={c.id} to={`/clip/${c.id}/`}>
                  <img src={c.thumbnail} alt='preview' />
                  <div className='playlist__overlay'>
                    <div className='name'>{c.grappler_name}</div>
                    <div className='tags'>{this.getTagString(c.tags)}</div>
                  </div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clip: state.clips.selected,
    clips: state.clips.list,
    total: state.clips.total,
    loading: state.clips.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (params) => dispatch(getClips(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
