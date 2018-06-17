import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGrapplers } from '../actions'
import AddIcon from 'typicons.font/src/svg/user-add.svg'
import { Link } from 'react-router-dom'


class GrapplerList extends Component {

  componentDidMount() {
    const { getGrapplers } = this.props
    getGrapplers()
  }

  render () {
    return (
      <div className="body grappler-list">
        <Link to="/create/" className="grappler">
          <div className="grappler--create">
          Add a Grappler
          </div>
          <div className="body-icon__wrapper">
            <AddIcon className="icon" />
          </div>
        </Link>
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
