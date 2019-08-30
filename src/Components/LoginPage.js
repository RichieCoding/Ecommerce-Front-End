import React, { Component } from "react";
import { Link } from 'react-router-dom' 

class LoginPage extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(parsedResponse => {
      console.log(parsedResponse)
      localStorage.setItem('token', parsedResponse.token )
      this.props.history.push('/profile')
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
            name='username'
          />
          <input
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
            name='password'
          />
          <input type='submit' value='Log In' />
        </form><br></br>
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
}

export default LoginPage;
