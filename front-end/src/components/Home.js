import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="body home">
      <div>
        <Link to="/clips/" className="big-link">Clips</Link>
      </div>
      <div>
        <Link to="/grapplers/" className="big-link">Profiles</Link>
      </div>
      <div>
        <Link to="/upload/" className="big-link">Upload</Link>
      </div>
      <div>
        <Link to="/create-playlist/" className="big-link">Create Playlist</Link>
      </div>
    </div>
  )
}

export default Home
