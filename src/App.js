import React, { Component } from "react";
import "./App.css";
import LoginPage from './Components/LoginPage'
import HomePage from './Components/HomePage'

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
        return <HomePage />
      case 'home':
        return <HomePage />
    }
  }
}

export default App;
