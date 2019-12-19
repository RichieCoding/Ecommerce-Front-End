import React, { Component } from 'react';

class AdminMenu extends Component {
  render() {
    return (
      <div className='admin-menu'>
        <div
          className='admin-menu-button'
          id='Orders'
          onClick={e => this.props.handleClick(e.target.id)}
        >
          <h3 id='Orders'>Orders</h3>
        </div>
        <div
          className='admin-menu-button'
          id='Inventory'
          onClick={e => this.props.handleClick(e.target.id)}
        >
          <h3 id='Inventory'>Inventory</h3>
        </div>
        <div
          className='admin-menu-button'
          id='Customers'
          onClick={e => this.props.handleClick(e.target.id)}
        >
          <h3 id='Customers'>Customers</h3>
        </div>
        <div
          className='admin-menu-button'
          id='Settings'
          onClick={e => this.props.handleClick(e.target.id)}
        >
          <h3 id='Settings'>Settings</h3>
        </div>
      </div>
    );
  }
}

export default AdminMenu;
