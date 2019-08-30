import React, { Component } from "react";
import OrderContainer from './OrderContainer'

class AdminOverviewContainer extends Component {
  state = {
    title: "Orders"
  };

  render() {
    return (
      <div className='admin-container'>

        <div className='admin-title'>
          <h3>{this.state.title}</h3>
        </div>

        <div className='admin-menu'>
          <div className='admin-menu-button'>
            <h3>Orders</h3>
          </div>
          <div className='admin-menu-button'>
            <h3>Inventory</h3>
          </div>
          <div className='admin-menu-button'>
            <h3>Customers</h3>
          </div>
          <div className='admin-menu-button'>
            <h3>Settings</h3>
          </div>
        </div>

        <OrderContainer />

      </div>
    );
  }
}

export default AdminOverviewContainer;
