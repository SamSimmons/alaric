import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClips, getGrapplers } from '../actions'
import { find } from 'lodash'

class AllClips extends Component {

  componentDidMount() {
    const { getClips, getGrapplers, grapplers, nextPage } = this.props
    getClips(null, nextPage)
    if (!grapplers.length) {
      getGrapplers()
    }
  }

  getNextPage = () => {
    const { getClips, nextPage } = this.props
    getClips(null, nextPage)
  }

  render() {
    const { grapplers, list, nextPage } = this.props

    return (
      <div className="clip-list">
        {list.map(
          (clip) =>
          <Link className="clip-list__container" key={clip.video} to={`/${clip.grappler}/clip/${clip.id}/`}>
            <video className="clip__video" src={clip.video} controls={false} />
            <div>{find(grapplers, ({ id }) => clip.grappler === id).name}</div>
            <div>{clip.opponent}</div>
            <div>
              {clip.tags.map(
                (t, i) => <span key={`${clip.video}-${i}`}>{t}</span>
              )}
            </div>
          </Link>
        )}
        {
          nextPage
          ? <button onClick={this.getNextPage}>Load more</button>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.clips.list,
    grapplers: state.grapplers.list,
    nextPage: state.clips.nextPage,
    total: state.clips.total,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getClips: (grappler, page) => dispatch(getClips(grappler, page)),
    getGrapplers: () => dispatch(getGrapplers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllClips)
