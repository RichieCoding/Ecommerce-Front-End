import React, { Component } from "react";
import OrderContainer from "./OrderContainer";
import InventoryContainer from "./InventoryContainer";
import AdminMenu from "../Components/AdminMenu";
import Header from "../Components/header/Header";
import AllUsersContainer from "./AllUsersContainer";
import SettingsContainer from './SettingsContainer';

class AdminOverviewContainer extends Component {
  state = {
    // Default Component is Order
    renderClick: "Orders"
  };

  handleClick = value => {
    console.log(value);
    this.setState({
      renderClick: value
    });
  };

  // Switches between different components
  renderClickedComponent = () => {
    switch (this.state.renderClick) {
      case "Orders":
        return <OrderContainer />;
      case "Inventory":
        return (
          <InventoryContainer
            updateQuantity={this.props.updateQuantity}
            products={this.props.products}
          />
        );
      case "Customers":
        return <AllUsersContainer />;
      case "Settings":
        return <SettingsContainer />;
      default:
        return <OrderContainer />;
    }
  };

  render() {
    return (
 
        <div className='admin-container'>
          {/* <Header admin={true}/> */}
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
