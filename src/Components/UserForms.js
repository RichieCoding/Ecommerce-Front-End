import React, { Component } from "react";

class UserForms extends Component {
  state = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
    city: "",
    state: "",
    state: "",
    zipcode: "",
    username: "",
    // password: ""
  };

  componentDidMount() {
    if (this.props.userInfo !== undefined) {
      this.setState({
        ...this.props.userInfo
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className='product-form-wrapper'>
        <form onSubmit={e => this.props.handleSubmit(e, this.state, this.props.userId)}>
          <label htmlFor='first_name'>First Name:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='First Name'
            name='first_name'
            value={this.state.first_name}
          />
          <label htmlFor='last_name'>Last Name:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Last Name'
            name='last_name'
            value={this.state.last_name}
          />
          <label htmlFor='email'>Email:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Email'
            name='email'
            value={this.state.email}
          />
          <label htmlFor='phone_number'>Phone Number:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Phone Number'
            name='phone_number'
            value={this.state.phone_number}
          />
          <label htmlFor='address'>Address:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Address'
            name='address'
            value={this.state.address}
          />
          <label htmlFor='city'>City:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='City'
            name='city'
            value={this.state.city}
          />
          <label htmlFor='state'>State:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='State'
            name='state'
            value={this.state.state}
          />
          <label htmlFor='zipcode'>Zipcode:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Zipcode'
            name='zipcode'
            value={this.state.zipcode}
          />
          <label htmlFor='username'>Username:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            placeholder='Username'
            name='username'
            value={this.state.username}
          />
          {/* <input
            type='password'
            onChange={this.handleChange}
            placeholder='Password'
            name='password'
            value={this.state.password}
          /> */}
          <input id='product-form-submit-btn' type="submit" />
        </form>
      </div>
    );
  }
}

export default UserForms;
