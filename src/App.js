import React, { Component } from "react";
import "./App.css";
import LoginPage from './Components/LoginPage'
import ProfilePage from './Components/ProfilePage'
import SignUpPage from './Components/SignUpPage'
import AdminOverviewContainer from "./Containers/AdminOverviewContainer";
import ShopHomePage from './Containers/ShopHomePage'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  state = {
    page: 'login'
  }

  redirect = (page) => {
    this.setState({
      page: page
    })
  }

  componentDidMount() {
    if (localStorage.token) {
      // console.log(this.props)
    }
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
