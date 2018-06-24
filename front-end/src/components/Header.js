import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 className="title">
          <span>
            <span className="acronym">BJJ</span> - Stalker
          </span>
        </h1>
      </Link>
    </header>
  )
}

export default Header;
