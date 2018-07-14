import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGrapplers } from '../actions'
import { Link } from 'react-router-dom'


class GrapplerList extends Component {

  componentDidMount() {
    const { getGrapplers } = this.props
    getGrapplers()
  }

  render () {
    const { grapplers } = this.props
    return (
      <div className="grappler-list">
        <Link to="/create/" className="big-link grappler grappler--create">
          <div>Add a Grappler</div>
        </Link>
        {
          grapplers.map(({ id, name, avatar }) => {
            return (
              <Link to={`/${id}/`} key={`grappler-${id}`} className="big-link grappler">
                <div className='name'>{name}</div>
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
    grapplers: state.grapplers.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGrapplers: () => dispatch(getGrapplers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrapplerList)
