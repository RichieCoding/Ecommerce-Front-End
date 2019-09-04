import React, { Component } from "react";
import SingleUser from "../Components/SingleUser";

class AllUsersContainer extends Component {
  state = {
    allUsers: []
  };

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    fetch("http://localhost:3000/users", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedUser => {
        const sortedUsers = parsedUser.sort(function(a,b){
          return a.first_name.localeCompare(b.first_name)
        })
        this.setState({
          allUsers: parsedUser
        });
      });
  };

  handleSubmit = (e, userInfo, id) => {
    e.preventDefault();
    fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        phone_number: userInfo.phoneNumber,
        ...userInfo
      })
    })
      .then(resp => resp.json())
      .then(parsedInfo => {
        this.fetchAllUsers();
      });
  };

  render() {
    const allUsers = this.state.allUsers.map(users => {
      return (
        <SingleUser
          key={users.id}
          users={users}
          handleSubmit={this.handleSubmit}
        />
      );
    });
    return (
      <div className='users-container'>
        <div className='single-user-grid single-user-header'>
          <h3>First Name:</h3>
          <h3>Username:</h3>
          <h3>Email:</h3>
        </div>
        <div className='hello'>{allUsers}</div>
      </div>
    );
  }
}

export default AllUsersContainer;
