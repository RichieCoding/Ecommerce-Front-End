import React, { Component } from "react";
import "./App.css";
import LoginPage from './Components/LoginPage'
import ProfilePage from './Components/ProfilePage'
import AdminOverviewContainer from "./Containers/AdminOverviewContainer";

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
      this.redirect('home')
    }
  }

  render() {
    switch(this.state.page) {
      case 'login':
        return <LoginPage redirect={this.redirect}/>
      case 'signup':
        return <ProfilePage />
      case 'home':
        return <ProfilePage />
      case 'admin':
        return <AdminOverviewContainer />
    }
  }

}

export default App;
