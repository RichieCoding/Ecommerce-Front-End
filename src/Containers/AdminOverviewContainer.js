import React, { Component } from "react";
import OrderContainer from "./OrderContainer";
import InventoryContainer from "./InventoryContainer/InventoryContainer";
import AdminMenu from "../Components/AdminMenu";
import AllUsersContainer from "./AllUsersContainer";
import SettingsContainer from './settings-page/SettingsContainer';

class AdminOverviewContainer extends Component {
  state = {
    renderClick: "Orders",
    darkMode: false
  };

  handleClick = value => {
    this.setState({
      renderClick: value
    });
  };

  handleDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode
    })
  }

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
        return <SettingsContainer handleDarkMode={this.handleDarkMode} />;
      default:
        return <OrderContainer />;
    }
  };

  render() {
    return (
        <div className='admin-container' style={this.state.darkMode ? darkModeStyles : null}>
          <div className='admin-title'>
            <h3>{this.state.renderClick}</h3>
          </div>
          <AdminMenu handleClick={this.handleClick} />
          {this.renderClickedComponent()}
        </div>
    );
  }
}

const darkModeStyles = {
  background: 'rgb(105,105,105)'
}

export default AdminOverviewContainer;
