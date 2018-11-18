import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const CreateGrappler = (props) => {
  const [name, changeName] = useState("")
  const { history } = props

  return (
    <div className="upload-form">
      <div className="fieldset">
        <label className="label" htmlFor="grappler">Name</label>
        <input type="text" onChange={(e) => changeName(e.currentTarget.value)} />
      </div>
      <div className="btn-container">
        <button
          className="btn"
          onClick={() => changeName("")}
        >Clear</button>
        <button
          className="btn btn--primary"
          onClick={() => {
            axios.post('/api/grapplers/', { name })
              .then(() => {
                history.push('/')
              })
          }}
        >Create</button>
      </div>
    </div>
  )
}

export default withRouter(CreateGrappler)
