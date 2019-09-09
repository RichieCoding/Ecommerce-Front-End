import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import './header.styles.scss'

class Header extends Component {

  handleClick = () => {
    localStorage.clear()
    // this.props.history.push('/')
  }

  render() {
    return (
      <nav>
        <h1 id="title">Blips &amp; Chitz</h1>
          <ul>
            <li><Link to='/'>Home</Link></li>
              { localStorage.token ? 
              <li><Link to='/profile'>Profile</Link></li> 
              : 
              <li><Link to='/login'>Login</Link></li>
              }
              { localStorage.token ? 
              <li onClick={this.handleClick}><Link to='/'>Log out</Link></li>
              : 
              null
              }
            
          </ul>
      </nav>
    )
  }
}

export default Header
