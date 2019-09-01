import React, { Component } from 'react'

class OrderContainer extends Component {
  render() {
    return (
      <div className="render-menu-container">
        <div className='admin-info-bar'>
          <div className='admin-info-box'>
            <h3>Total Sales</h3>
          </div>
          <div className='admin-info-box'>
            <h3>Total Earnings</h3>
          </div>
          <div className='admin-info-box'>
            <h3>Top Customer</h3>
          </div>
        </div>
        <div className='admin-order-component'>
          <h3>Hello</h3>
        </div>
      </div>
    )
  }
}

export default OrderContainer
