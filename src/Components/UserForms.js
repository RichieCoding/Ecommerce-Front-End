import React, { Component } from "react";

class UserForms extends Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    state: "",
    state: "",
    zipcode: "",
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      first_name,
      last_name,
      address
    } = this.props.userInfo
    return (
      <div>
        <form onSubmit={e => this.props.handleSubmit(e, this.state, this.props.userId)}>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='First Name'
            name='firstName'
            value={this.state.firstName}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Last Name'
            name='lastName'
            value={this.state.lastName}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Email'
            name='email'
            value={this.state.email}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Phone Number'
            name='phoneNumber'
            value={this.state.phoneNumber}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Address'
            name='address'
            value={this.state.address}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='City'
            name='city'
            value={this.state.city}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='State'
            name='state'
            value={this.state.state}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Zipcode'
            name='zipcode'
            value={this.state.zipcode}
          />
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Username'
            name='username'
            value={this.state.username}
          />
          <input
            type='password'
            onChange={this.handleChange}
            placeholder='Password'
            name='password'
            value={this.state.password}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default UserForms;
