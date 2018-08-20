import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGrapplers, uploadRequest } from '../actions'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { tagOptions } from '../constants'

class Upload extends Component {
  state = {
    files: [],
    grappler: null,
    tags: [],
  }

  componentDidMount() {
    const { getGrapplers } = this.props
    getGrapplers()
  }

  getFileLabel() {
    const { files } = this.state
    switch (files.length) {
      case 0: { return "Choose a File"}
      case 1: { return "1 File Selected"}
      default: { return `${files.length} Files Selected` }
    }
  }

  render() {
    const { list } = this.props
    if (!list.length) {
      return null
    }
    const { grappler, tags } = this.state
    const grapplerOptions = list.map((g) => {
      return {
        value: g.id,
        label: g.name,
      }
    })
    return (
      <div className="upload-form">
        <div className="fieldset">
          <label className="label section-title" htmlFor="grappler">Grappler</label>
          <Select
            name="grappler"
            value={grappler}
            options={grapplerOptions}
            onChange={(selected) => {
              this.setState({ grappler: selected })
            }}
          />
        </div>
        <div className="fieldset">
          <label htmlFor="file" className="label label--file section-title">{this.getFileLabel()}</label>
          <input
            className="inputfile"
            multiple="multiple"
            name="file"
            id="file"
            type="file"
            onChange={(e) => {
              const files = e.target.files
              this.setState({ files })
            }}
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
        <div className="btn-container">
          <Link to="/" className="btn btn--secondary">Cancel</Link>
          <button
            className="btn"
            onClick={() => {
              const { uploadRequest } = this.props
              uploadRequest(this.state)
            }}
          >Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.grapplers.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadRequest: (params) => dispatch(uploadRequest(params)),
    getGrapplers: () => dispatch(getGrapplers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload)
