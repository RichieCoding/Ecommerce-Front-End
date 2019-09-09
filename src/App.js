import React, { Component } from "react";
import "./App.css";
import LoginPage from "./Containers/login-page/LoginPage";
import ProfilePage from "./Components/ProfilePage";
import SignUpPage from "./Containers/SignUpContainer";
import AdminOverviewContainer from "./Containers/AdminOverviewContainer";
import ShopHomePage from "./Containers/ShopHomePage";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    page: "login",
    products: []
  };

  redirect = page => {
    this.setState({
      page: page
    });
  };

  componentDidMount() {
    this.fetchProducts()
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
  }

  updateQuantity = data => {
    this.fetchProducts()
  };

  render() {
    return (
      <Switch>
        <Route exact path='/' component={ShopHomePage} />
        <Route path='/login' component={LoginPage} />
        <Route
          path='/profile'
          render={routerProps => (
            <ProfilePage
              {...routerProps}
              products={this.state.products}
              updateQuantity={this.updateQuantity}
            />
          )}
        />
        <Route path='/signup' component={SignUpPage} />
      </Switch>
    );
  }
}

export default App;
