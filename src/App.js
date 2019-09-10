import React, { Component } from "react";
import "./App.css";
import LoginPage from "./Containers/login-page/LoginPage";
import ProfilePage from "./Components/ProfilePage";
import SignUpPage from "./Containers/SignUpContainer";
import AdminOverviewContainer from "./Containers/AdminOverviewContainer";
import ShopHomePage from "./Containers/ShopHomePage";
import Header from "./Components/header/Header"
import CartPage from "./Containers/cart-page/CartPage"
import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    page: "login",
    products: [],
    currentUser: {
      admin: false
    },
    cart: {
      products: []
    }
     
  };

  redirect = page => {
    this.setState({
      page: page
    });
  };

  componentDidMount() {
    this.fetchProducts();
    fetch('http://localhost:3000/profile', {
      headers: {
        'Authorization': localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(parsedData => {
      if (localStorage.token) {
        this.fetchCartItems(parsedData.cart.id)
      
      this.setState({
        currentUser: parsedData
      })
    }
    })
  }

  handleCartFetch = () => {
    this.componentDidMount()
  }

  // Fetch Cart Items
  fetchCartItems = (id) => {
    fetch(`http://localhost:3000/carts/${id}`, {
      headers: {
        'Authorization': localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(cartData => this.setState({
      cart: cartData
    }))
  }

  // Fetch all products
  fetchProducts = () => {
    fetch("http://localhost:3000/products")
      .then(resp => resp.json())
      .then(parsedData => {
        // const sortedProducts = parsedData.sort(function(a,b){
        //   return a.varientID.localeCompare(b.varientID)
        // })
        this.setState({
          products: parsedData
        });
      });
  };

  // Get Current User from LoginPage
  // getCurrentUser = userData => {
  //   console.log(`hello ${userData}`);
  //   this.setState({
  //     currentUser: userData
  //   })
  // };

  updateQuantity = data => {
    this.fetchProducts();
  };


  render() {
    return (
      <>
      <Header cart={this.state.cart} handleCartFetch={this.handleCartFetch} currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' render={routerProps => (<ShopHomePage cart={this.state.cart} />)} />
        <Route
          path='/login'
          render={routerProps => (
            <LoginPage handleCartFetch={this.handleCartFetch} getCurrentUser={this.getCurrentUser} {...routerProps} />
          )}
        />
        <Route
          path='/profile'
          render={routerProps => (
            <ProfilePage
              {...routerProps}
              products={this.state.products}
              updateQuantity={this.updateQuantity}
              currentUser={this.state.currentUser}
              cart={this.state.cart}
            />
          )}
        />
        <Route
          path='/cart'
          render={routerProps => (
            <CartPage
              {...routerProps}
              currentUser={this.state.currentUser}
            />
          )}
        />
        <Route path='/signup' component={SignUpPage} />
      </Switch>
      </>
    );
  }
}

export default App;
