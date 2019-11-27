import React, { Component } from "react";
import UserFormContainer from '../Containers/user-form-container/UserFormContainer';

import URL from './URL'

class SingleUser extends Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  handleSubmit = (e, userInfo, id) => {
    e.preventDefault();
    fetch(`${URL}/users/${id}`, {
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
        this.setState({
          clicked: !this.state.clicked
        })
        this.props.fetchAllUsers();
      });
  };

  render() {
    const { first_name, username, email, id } = this.props.users;
    return (
      <div className='single-user single-user-grid '>
        <h3>{first_name}</h3>
        <h3>{username}</h3>
        <h3>{email}</h3>
        <button id='single-user-edit-btn'
          onClick={e => {
            this.setState({
              clicked: !this.state.clicked
            });
          }}
        >
          Edit
        </button>
        {this.state.clicked ? (
          <UserFormContainer
            title={"Edit User"}
            handleClick={this.handleClick}
            userInfo={this.props.users}
            userId={id}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default SingleUser;
