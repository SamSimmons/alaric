import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGrapplers, uploadRequest } from '../actions'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

const tagOptions = [
  { label: 'Takedown', value: 'Takedown' },
  { label: 'Sweep', value: 'Sweep' },
  { label: 'Pass', value: 'Pass' },
  { label: 'Back Take', value: 'Back Take' },
  { label: 'Submission', value: 'Submission' },
  { label: 'Submission Entry', value: 'Submission Entry' },
  { label: 'Choke', value: 'Choke' },
  { label: 'Limb Submission', value: 'Limb Submission' },
]

class Upload extends Component {
  state = {
    video: null,
    grappler: null,
    tags: [],
  }

  componentDidMount() {
    const { getGrapplers } = this.props
    getGrapplers()
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
          <label className="label" htmlFor="grappler">Grappler</label>
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
          <label className="label" htmlFor="video">Select File</label>
          <input name="video" type="file" onChange={(e) => {
              const file = e.target.files[0]
              this.setState({ video: file })
            }}
          />
        </div>
        <div className="fieldset">
          <label className="label" htmlFor="tags">Tags</label>
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
          <button
            className="btn"
            onClick={() => {
              this.setState({
                video: null,
                grappler: null,
                tags: [],
              })
            }}
          >Clear</button>
          <button
            className="btn btn--primary"
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
