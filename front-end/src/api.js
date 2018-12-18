import { useEffect, useState } from 'react'
import axios from 'axios'

export const get = ({ url, defaultData = null }) => {
  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect((params) => {
    axios.get(url)
      .then(({ data }) => data)
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return [data, loading, error]
}
