import React, { Component } from "react";
import OrderContainer from "./OrderContainer";
import InventoryContainer from "./InventoryContainer";
import AdminMenu from "../Components/AdminMenu";

class AdminOverviewContainer extends Component {
  state = {
    renderClick: "Orders"
  };

  handleClick = value => {
    console.log(value);
    this.setState({
      renderClick: value
    });
  };

  renderClickedComponent = () => {
    switch (this.state.renderClick) {
      case "Orders":
        return <OrderContainer />;
      case "Inventory":
        return <InventoryContainer />;
      default:
        return <OrderContainer />;
    }
  };

  render() {
    return (
      <div className='admin-container'>
        <div className='admin-title'>
          <h3>{this.state.renderClick}</h3>
        </div>
        <AdminMenu handleClick={this.handleClick} />
        {this.renderClickedComponent()}
      </div>
    );
  }
}

export default AdminOverviewContainer;
