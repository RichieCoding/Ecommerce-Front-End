import React, { Component } from "react";
import "./customer-profile-form.styles.scss";
import URL from '../../Components/URL'

class CustomerProfileForm extends Component {
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
    password: "",
    submitted: false
  };

  componentDidMount() {
    fetch(`${URL}/profile`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedData => {
        this.setState({
          ...parsedData
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${URL}/users/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...this.state
      })
    }).then(() => {
      this.setState({
        submitted: true
      })
      setTimeout(() => {
        this.setState({submitted: false})
      }, 1000)
    })
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { first_name } = this.state;
    // debugger
    // console.log(this.props.usersOrders)
    return (
      <div className='customer-profile-form'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='first_name'>First Name:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='First Name'
            name='first_name'
            value={first_name}
          />
          <br></br>
          <label htmlFor='last_name'>Last Name:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='Last Name'
            name='last_name'
            value={this.state.last_name}
          />
          <br></br>
          <label htmlFor='email'>Email:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='Email'
            name='email'
            value={this.state.email}
          />
          <br></br>
          <label htmlFor='phone_number'>Phone Number:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='Phone Number'
            name='phone_number'
            value={this.state.phone_number}
          />
          <br></br>
          <label htmlFor='address'>Address:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='Address'
            name='address'
            value={this.state.address}
          />
          <br></br>
          <label htmlFor='city'>City:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='City'
            name='city'
            value={this.state.city}
          />
          <br></br>
          <label htmlFor='state'>State:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='State'
            name='state'
            value={this.state.state}
          />
          <br></br>
          <label htmlFor='zipcode'>Zipcode:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='Zipcode'
            name='zipcode'
            value={this.state.zipcode}
          />
          <br></br>
          <label htmlFor='username'>Username:</label>
          <br></br>
          <input
            type='text'
            onChange={this.handleChange}
            // placeholder='Username'
            name='username'
            value={this.state.username}
          />
          <br></br>
          <label htmlFor='password'>Password:</label>
          <br></br>
          <input
            type='password'
            onChange={this.handleChange}
            // placeholder='Password'
            name='password'
            value={this.state.password}
          />
          <br></br>
          <input id='product-form-submit-btn' type='submit' />
          { this.state.submitted ? <div className='test'>
            <h2>Updated</h2>
          </div> : null}
        </form>
      </div>
    );
  }
}

export default CustomerProfileForm;
