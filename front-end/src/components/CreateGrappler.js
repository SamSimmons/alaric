import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGrappler } from '../actions'

class Upload extends Component {
  state = {
    name: "",
    avatar: null,
  }

  render() {

    return (
      <div className="upload-form">
        <div className="fieldset">
          <label className="label" htmlFor="grappler">Name</label>
          <input type="text" onChange={(e) => {
            this.setState({ name: e.target.value })
          }} />
        </div>
        <div className="fieldset">
          <label className="label" htmlFor="video">Avatar</label>
          <input name="avatar" type="file" onChange={(e) => {
              const file = e.target.files[0]
              this.setState({ avatar: file })
            }}
          />
        </div>
        <div className="btn-container">
          <button
            className="btn"
            onClick={() => {
              this.setState({
                name: "",
                avatar: null,
              })
            }}
          >Clear</button>
          <button
            className="btn btn--primary"
            onClick={() => {
              const { createGrappler } = this.props
              const { name, avatar } = this.state
              createGrappler({ name, avatar })
            }}
          >Create</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGrappler: (data) => dispatch(createGrappler(data))
  }
}

export default connect(undefined, mapDispatchToProps)(Upload)
