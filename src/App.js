import React, { Component } from "react";
import "./App.css";
import LoginPage from "./Containers/login-page/LoginPage";
import ProfilePage from "./Components/ProfilePage";
import SignUpPage from "./Containers/SignUpContainer";
import AdminOverviewContainer from "./Containers/AdminOverviewContainer";
import ShopHomePage from "./Containers/shop-home-page/ShopHomePage";
import Header from "./Components/header/Header"
import CartPage from "./Containers/cart-page/CartPage"
import { Switch, Route } from "react-router-dom";
import ShopProductPage from "./Containers/shop-product-page/ShopProductPage";

class App extends Component {
  state = {
    page: "login",
    products: [],
    currentUser: {
      admin: false
    },
    cart: []
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
        this.fetchCartItems(parsedData.id)
      
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
    fetch(`http://localhost:3000/cart_items/${id}`, {
      headers: {
        'Authorization': localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(cartData => this.setState({
      cart: cartData
    }))
  }

  getCartAgain = () => {
    this.componentDidMount()
  }

  setCartToZero = () => {
    this.setState({
      cart: []
    })
  }

  // Fetch all products
  fetchProducts = () => {
    fetch("http://localhost:3000/products")
      .then(resp => resp.json())
      .then(parsedData => {
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
      <Header cart={this.state.cart} setCartToZero={this.setCartToZero} handleCartFetch={this.handleCartFetch} currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' render={routerProps => (<ShopHomePage cart={this.state.cart} />)} />
        <Route
          path='/login'
          render={routerProps => (
            <LoginPage handleCartFetch={this.handleCartFetch} getCurrentUser={this.getCurrentUser} {...routerProps} />
          )}
        />
        <Route
          path='/shop'
          render={routerProps => (
            <ShopProductPage handleCartFetch={this.handleCartFetch} getCurrentUser={this.getCurrentUser} {...routerProps} />
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
              getCartAgain={this.getCartAgain}
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
