import React, { Component } from "react";
import OrderContainer from './OrderContainer'
import InventoryContainer from './InventoryContainer'
import AdminMenu from '../Components/AdminMenu'

class AdminOverviewContainer extends Component {
  state = {
    title: "Orders",
  };

  handleClick = e => {
    console.log(e.target)
    this.setState({
      renderClick: e.target.id
    })
  }

  render() {
    return (
      <div className='admin-container'>

        <div className='admin-title'>
          <h3>{this.state.title}</h3>
        </div>

        <AdminMenu />
          <OrderContainer />
      </div>
    );
  }
}

export default AdminOverviewContainer;
