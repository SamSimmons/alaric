import React, { useEffect, useState } from 'react'
import { Card } from './index'
import axios from 'axios'
import './grapplers.css'

const Grapplers = (props) => {
  const [grapplers, setGrapplers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setError] = useState(null)

  useEffect(() => {
    axios.get('/api/grapplers/')
      .then(({ data }) => {
        setGrapplers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (err) {
    return <h1>ERROR!</h1>
  }

  return (
    <div className='grapplers__wrapper'>
      {
        grapplers.map((props) =>
          <Card {...props} key={props.url} />
        )
      }
    </div>
  )
}

export default Grapplers
