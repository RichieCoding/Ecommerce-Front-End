import React, { Component } from "react";
import "./App.css";
import LoginPage from "./Containers/login-page/LoginPage";
import ProfilePage from "./Components/ProfilePage";
import SignUpPage from "./Containers/SignUpContainer";
import AdminOverviewContainer from "./Containers/AdminOverviewContainer";
import ShopHomePage from "./Containers/shop-home-page/ShopHomePage";
import Header from "./Components/header/Header";
import CartPage from "./Containers/cart-page/CartPage";
import { Switch, Route } from "react-router-dom";
import ShopProductPage from "./Containers/shop-product-page/ShopProductPage";
import SingleProductPage from "./Containers/single-product-page/SingleProductPage";
import HeaderMobile from "./Components/header-mobile/HeaderMobile";
import URL from './Components/URL'

class App extends Component {
  state = {
    page: "login",
    products: [],
    productsLoaded: false,
    currentUser: {
      admin: false
    },
    cart: [],
    cartId: "",
    menuOpen: false
  };

  redirect = page => {
    this.setState({
      page: page
    });
  };

  // Handles header mobile open and close
  handleMenuOpen = () => {
    this.setState(prevState => {
      return { menuOpen: !prevState.menuOpen };
    });
  };

  // For header to close out header mobile when cart is clicked
  handleMenuClose = () => {
    this.setState({
      menuOpen: false
    })
  }

  componentDidMount() {
    this.fetchProducts();
    console.log(URL)
    // Fetch Current User Information
    if (localStorage.token) {
      fetch(`${URL}/profile`, {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(parsedData => {
          if (localStorage.token) {
            this.fetchCartItems(parsedData.id);

            this.setState({
              currentUser: parsedData,
              cartId: parsedData.cart.id,
            });
          }
        });
    }
  }

  // Fetch all products
  fetchProducts = () => {
    fetch(`${URL}/products`)
      .then(resp => resp.json())
      .then(parsedData => {
        this.setState({
          products: parsedData,
          productsLoaded: true
        });
      });
  };

  // Fetch Cart Items
  fetchCartItems = id => {
    fetch(`${URL}/cart_items/${id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(cartData =>
        this.setState({
          cart: cartData
        })
      );
  };

  handleCartFetch = () => {
    this.componentDidMount();
  };

  setCartToZero = () => {
    this.setState({
      cart: []
    });
  };

  updateQuantity = data => {
    this.fetchProducts();
  };

  updateCartToZero = () => {
    this.setState({
      cart: []
    });
  };

  render() {
    return (
      <>
        <Header
          cart={this.state.cart} // Checks what is in cart
          setCartToZero={this.setCartToZero} // Sets cart to zero when you log out
          handleCartFetch={this.handleCartFetch} // Fetches cart from database
          currentUser={this.state.currentUser} // Gets current user 
          handleMenuOpen={this.handleMenuOpen} // Handles menu opening and closing for hamburger menu
          handleMenuClose={this.handleMenuClose} // Closes menu when you click on cart and logo
          isOpen={this.state.menuOpen} // Checks to see if the menu is open
        />
        <Switch>
          {this.state.menuOpen ? (
            <HeaderMobile
              menuClicked={this.handleMenuOpen}
              setCartToZero={this.setCartToZero}
              handleCartFetch={this.handleCartFetch}
            />
          ) : null}
          <Route
            exact
            path='/'
            render={routerProps => <ShopHomePage cart={this.state.cart} />}
          />
          <Route
            path='/login'
            render={routerProps => (
              <LoginPage
                handleCartFetch={this.handleCartFetch}
                getCurrentUser={this.getCurrentUser}
                {...routerProps}
              />
            )}
          />
          <Route
            exact
            path='/shop'
            render={routerProps => (
              <ShopProductPage
                products={this.state.products}
                productsLoaded={this.state.productsLoaded}
                handleCartFetch={this.handleCartFetch}
                cart={this.state.cart}
                cartId={this.state.cartId}
                {...routerProps}
              />
            )}
          />
          <Route
            path='/shop/:id'
            render={routerProps => (
              <SingleProductPage
                {...routerProps}
                products={this.state.products}
                updateQuantity={this.updateQuantity}
                currentUser={this.state.currentUser}
                cart={this.state.cart}
                cartId={this.state.cartId}
                handleCartFetch={this.handleCartFetch} // Fetches cart from database
              />
            )}
          />
          <Route
            path='/profile'
            render={routerProps => (
              <ProfilePage
                {...routerProps}
                products={this.state.products}
                updateQuantity={this.updateQuantity}
                productsLoaded={this.state.productsLoaded}
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
                handleCartFetch={this.handleCartFetch}
                updateQuantity={this.updateQuantity}
                updateCartToZero={this.updateCartToZero}
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
