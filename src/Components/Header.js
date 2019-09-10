import React from 'react'
import { Link } from 'react-router-dom'
// import './header.styles.scss'

const Header = () => (
  <nav className='admin-header'>
    <h1 id="title">Blips &amp; Chitz</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
      </ul>
  </nav>
)

export default Header