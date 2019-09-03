import React, { Component } from "react";
import Manager from "./Manager";
import AdminOverviewContainer from "../Containers/AdminOverviewContainer";
import { Link } from "react-router-dom";
import Login from './LoginPage'
import Profile from './Profile'

class ProfilePage extends Component {
  state = {
    currentUser: {}
  };

  componentDidMount() {
    this.checkForToken()
  }


   checkForToken = () => {
     if (localStorage.token) {
      fetch("http://localhost:3000/profile", {
        headers: {
          Authorization: localStorage.token
        }
      })
        .then(res => res.json())
        .then(parsedData =>
          this.setState({
            currentUser: parsedData
          })
        );
     } else {
       this.props.history.push('/login')
     }
   }

  render() {
    const {admin} = this.state.currentUser

    if (admin && localStorage.token) {
      return <AdminOverviewContainer currentUser = 'currentUser' />;
    } else if (localStorage.token) {
      return <Profile userInfo={this.state.currentUser} />
    } else {
      return <Login />
    }
  }
}

export default ProfilePage;
