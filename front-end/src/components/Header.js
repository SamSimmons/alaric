import React from 'react';
import { Link } from 'react-router-dom'
import Upload from 'typicons.font/src/svg/upload.svg'

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className="title">BJJ - STALKER</h1>
      </Link>
      <Link to="/upload/">
        <div className="icon__wrapper">
          <Upload className="icon"/>
        </div>
      </Link>
    </header>
  )
}

export default Header;
