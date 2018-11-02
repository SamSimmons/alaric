import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="side-nav">
        <Link to="/clips/" className="big-link">Clips</Link>
        <Link to="/upload/" className="big-link">Upload</Link>
    </div>
  )
}

export default Home
