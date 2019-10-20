import React, { Component } from "react";

class SignUpForm extends Component {
  state = {
    first_name: "",
    username: "",
    email: "",
    password: "",
    missingInputs: false
  };

  handleSignUp = e => {
    e.preventDefault();
    const { first_name, username, email, password } = this.state;
    if ((first_name, username, email, password !== "")) {
      fetch("https://shoppie-final-backend.herokuapp.com/users", {
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
        .then(this.props.history.push("/profile"));
    } else {
      this.setState({
        missingInputs: true
      });
      setTimeout(() => {
        this.setState({
          missingInputs: false
        });
      }, 2000);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {missingInputs, first_name, username, email, password} = this.state
    return (
      <div className='sign-up-form'>
        <div className='login-header'>
          <h3>I do not have an account</h3>
          <p>Sign up with your email and password</p>
          {this.state.missingInputs ? (
            <p className='error-message'>Please enter into all fields</p>
          ) : null}
        </div>
        <form onSubmit={this.handleSignUp}>
          <label>First Name:</label>
          <br></br>
          <input
            type='text'
            value={first_name}
            onChange={this.handleChange}
            name='first_name'
            className={ missingInputs ? !first_name ? 'empty-input' : null : null}
          />
          <br></br>
          <label>Username:</label>
          <br></br>
          <input
            type='text'
            value={username}
            onChange={this.handleChange}
            name='username'
            className={ missingInputs ? !username ? 'empty-input' : null : null}
          />
          <br></br>
          <label>Email:</label>
          <br></br>
          <input
            type='text'
            value={email}
            onChange={this.handleChange}
            name='email'
            className={ missingInputs ? !email ? 'empty-input' : null : null}
          />
          <br></br>
          <label>Password:</label>
          <br></br>
          <input
            type='password'
            value={password}
            onChange={this.handleChange}
            name='password'
            className={ missingInputs ? !password ? 'empty-input' : null : null}
          />
          <br></br>

          <input className='submit' type='submit' value='Sign Up' />
        </form>
      </div>
    );
  }
}

export default SignUpForm;
