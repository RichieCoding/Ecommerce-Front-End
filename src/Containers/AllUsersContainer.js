import React, { Component } from "react";
import SingleUser from "../Components/SingleUser";
import URL from '../Components/URL'

class AllUsersContainer extends Component {
  state = {
    allUsers: []
  };

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    fetch(`${URL}/users`, {
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

  

  render() {
    const allUsers = this.state.allUsers.map(users => {
      return (
        <SingleUser
          key={users.id}
          users={users}
          fetchAllUsers={this.fetchAllUsers}
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
