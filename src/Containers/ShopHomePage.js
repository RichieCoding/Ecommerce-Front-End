import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ShopHomePage extends Component {
  render() {
    return (
      <div>
        <h1>HomePage SHOP</h1>
        <Link to='/login'>Login</Link>
      </div>
    )
  }
}

export default ShopHomePage
