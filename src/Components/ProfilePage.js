import React, { Component } from "react";
import AdminOverviewContainer from "../Containers/AdminOverviewContainer";
import { Link } from "react-router-dom";
import Login from "../Containers/login-page/LoginPage";
import Profile from "./Profile";
import UserProfile from "./user-profile/UserProfile";

class ProfilePage extends Component {
  state = {
    currentUser: {},
    usersOrders: []
  };

  componentDidMount() {
    this.setState({
      currentUser: {}
    })
    this.checkForToken();
  }

  fetchAllUserOrders = () => {
    fetch(`https://shoppie-final-backend.herokuapp.com/users/${this.state.currentUser.id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedOrder =>
        this.setState({
          usersOrders: parsedOrder.orders
        })
      );
  };

  checkForToken = () => {
    if (localStorage.token) {
      fetch("https://shoppie-final-backend.herokuapp.com/profile", {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(res => res.json())
        .then(parsedData =>
          this.setState({
            currentUser: parsedData
          })
        )
        .then(() => this.fetchAllUserOrders());
    } else {
      this.props.history.push("/login");
    }
  };

  render() {
    const { admin } = this.state.currentUser;
    if (admin && localStorage.token) {
      return (
        <AdminOverviewContainer
          products={this.props.products}
          updateQuantity={this.props.updateQuantity}
          currentUser='currentUser'
        />
      );
    } else if (localStorage.token) {
      return (
        <UserProfile
          userInfo={this.state.currentUser}
          currentUser={this.props.currentUser}
          usersOrders={this.state.usersOrders}
          cart={this.props.cart}
        />
      );
    } else {
      return <Login history={this.props.history} />;
    }
  }
}

export default ProfilePage;
