import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Components/header/Header'

class ShopHomePage extends Component {
  render() {
    return (
      <>
      <Header />
      <div>
        <h1>HomePage SHOP</h1>
        <Link to='/login'>Login</Link>
      </div>
      </>
    )
  }
}

export default ShopHomePage
