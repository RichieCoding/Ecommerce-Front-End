import React, { Component } from 'react'

class AdminMenu extends Component {
  render() {
    return (
      <div className='admin-menu'>
          <div className='admin-menu-button' id='orders' onClick={this.handleClick}>
            <h3>Orders</h3>
          </div>
          <div className='admin-menu-button' id='inventory' onClick={this.handleClick}>
            <h3>Inventory</h3>
          </div>
          <div className='admin-menu-button' id='customers' onClick={this.handleClick}>
            <h3>Customers</h3>
          </div>
          <div className='admin-menu-button' id='settings' onClick={this.handleClick}>
            <h3>Settings</h3>
          </div>
        </div>
    )
  }
}

export default AdminMenu
