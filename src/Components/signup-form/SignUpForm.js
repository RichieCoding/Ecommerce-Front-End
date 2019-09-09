import React, { Component } from "react";

class SignUpForm extends Component {
  state = {
    first_name: '',
    username: '',
    email: '',
    password: ''
  }


  handleSignUp = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        ...this.state
      })
    })
      .then(resp => resp.json())
      .then(this.props.history.push('/profile'));
  };

  // handleLogIn = () => {
  //   fetch("http://localhost:3000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({
  //       username: this.state.username,
  //       password: this.state.password
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(parsedResponse => {
  //       localStorage.setItem("token", parsedResponse.token);
  //       // this.props.history.push('/')
  //     });
  // };

  handleChange = e => {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSignUp}>
          <label>First Name:</label>
          <br></br>
          <input
            type='text'
            value={this.state.first_name}
            onChange={this.handleChange}
            name='first_name'
          />
          <br></br>
          <label>Username:</label>
          <br></br>
          <input
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
            name='username'
          />
          <br></br>
          <label>Email:</label>
          <br></br>
          <input
            type='text'
            value={this.state.email}
            onChange={this.handleChange}
            name='email'
          />
          <br></br>
          <label>Password:</label>
          <br></br>
          <input
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
            name='password'
          />
          <br></br>
          
          <input className='submit' type='submit' value='Sign Up' />
        </form>
      </div>
    );
  }
}

export default SignUpForm;
