import React, { Component } from "react";
import UserForms from "../Components/UserForms";
import URL from '../Components/URL'

class SignUpContainer extends Component {
  handleSubmit = (e, userInfo) => {
    e.preventDefault();
    fetch(`${URL}/users`, {
      method: "POST",
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
      .then(this.props.history.push("/login"));
  };

  render() {
    return (
      <div>
        <UserForms handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default SignUpContainer;
