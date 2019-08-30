import React, { Component } from "react";
import Manager from "./Manager";
import AdminOverviewContainer from "../Containers/AdminOverviewContainer";
import { Link } from "react-router-dom";
import Login from './LoginPage'

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
    const {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      city,
      state,
      zipcode,
      username,
      admin
    } = this.state.currentUser;

    if (admin && localStorage.token) {
      return <AdminOverviewContainer currentUser = 'currentUser' />;
    } else if (localStorage.token) {
      return (
        <div>
          <h1>Profile Page you're {`${first_name} ${last_name}`}</h1>
          <h3>Email: {email}</h3>
          <h3>Phone Number: {phone_number}</h3>
          <h3>UserName: {username}</h3>
          <h3>City: {city}</h3>
          <h3>state: {state}</h3>
          {admin ? <Link to='/admin'>Manage</Link> : null}
        </div>
      );
    } else {
      return <Login />
    }
  }
}

export default ProfilePage;
