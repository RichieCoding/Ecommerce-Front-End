import React, { Component } from "react";
import "./login-page.styles.scss";
import { Link } from "react-router-dom";
import Header from "../../Components/header/Header";
import SignUpForm from '../../Components/signup-form/SignUpForm'

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

  handleLoginIn = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(parsedResponse => {
        console.log(parsedResponse);
        localStorage.setItem("token", parsedResponse.token);
        this.props.history.push("/profile")
      });
  };

  render() {
    return (
      <>
        <Header />
        <div className='login-page'>
          {/* <div className='login-signup-container'> */}

          <div className='login-section'>
            <div className='login-header'>
              <h3>I already have an account</h3>
              <p>Sign in with your email and password</p>
            </div>
            <form onSubmit={this.handleLoginIn}>
              <label>Username:</label>
              <br></br>
              <input
                type='text'
                value={this.state.username}
                onChange={this.handleChange}
                name='username'
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
              <input className='submit' type='submit' value='Log In' />
            </form>
            <br></br>
          </div>

          <div className='login-section'>
            <div className='login-header'>
              <h3>I do not have an account</h3>
              <p>Sign up with your email and password</p>
            </div>
            <SignUpForm history={this.props.history}/>
            <br></br>
          </div>
          {/* </div> */}
          {/* <Link to='/signup'>Signup</Link> */}
        </div>
      </>
    );
  }
}

export default LoginPage;
