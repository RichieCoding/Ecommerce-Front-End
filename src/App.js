import React, { Component } from "react";
import "./App.css";
import LoginPage from './Components/LoginPage'
import ProfilePage from './Components/ProfilePage'
import SignUpPage from './Containers/SignUpContainer'
import AdminOverviewContainer from "./Containers/AdminOverviewContainer";
import ShopHomePage from './Containers/ShopHomePage'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  state = {
    page: 'login',
    products: []
  }

  redirect = (page) => {
    this.setState({
      page: page
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/products')
    .then(resp => resp.json())
    .then(parsedData => {this.setState({
      products: parsedData
    })})
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ShopHomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/profile' component={ProfilePage} />
        <Route path='/signup' component={SignUpPage} />
      </Switch>
    )
  }

}

export default App;
