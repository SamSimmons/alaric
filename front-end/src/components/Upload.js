import React, { useState } from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { grapplerCache } from './Filter'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

const Upload = (props) => {
  const grapplers = grapplerCache.read().map(({ id, name }) => ({ value: id, label: name }))
  const [ grappler, changeGrappler ] = useState("")
  const [ files, changeFiles ] = useState([])

  const getFileLabel = () => {
    switch (files.length) {
      case 0: { return "Choose a File"}
      case 1: { return "1 File Selected"}
      default: { return `${files.length} Files Selected` }
    }
  }

  return (
    <div className="upload-form">
      <div className="fieldset">
        <label className="label section-title" htmlFor="grappler">Grappler</label>
        <Select
          name="grappler"
          value={grappler}
          options={grapplers}
          onChange={(selected) => changeGrappler(selected)}
        />
      </div>
      <div className="fieldset">
        <label htmlFor="file" className="label label--file section-title">{getFileLabel()}</label>
        <input
          className="inputfile"
          multiple="multiple"
          name="file"
          id="file"
          type="file"
          onChange={(e) => {
            const { files } = e.target
            changeFiles(files)
          }}
        />
      </div>
      <div className="btn-container">
        <Link to="/" className="btn btn--secondary">Cancel</Link>
        <button
          className="btn"
          onClick={() => {
            const { history } = props
            const data =  new FormData()
            data.append('grappler', grappler.value)
            for(let key in files) {
              data.append(`videos[${key}]`, files[key])
            }
            axios.post('/api/clips/?multi=true', data, { headers: { 'Content-Type': 'multipart/form-data' }})
              .then(({ data }) => {
                history.push('/')
                return data
              })

          }}
        >Save</button>
      </div>
    </div>
  )
}

export default withRouter(Upload)
