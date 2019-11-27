import React, { Component } from "react";
import "./login-page.styles.scss";
import SignUpForm from "../../Components/signup-form/SignUpForm";
import URL from '../../Components/URL'

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    wrongUser: false,
    emptyLogin: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLoginIn = e => {
    e.preventDefault();
    const { username, password } = this.state;

    // Checks if username and password inputs are empty
    if (username && password !== "") {
      fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(this.state)
      })
        .then(res => res.json())
        .then(parsedResponse => {
          localStorage.setItem("token", parsedResponse.token);

          // If wrong username or password is entered
          if (localStorage.token === "undefined") {
            // Clear localstorage of the undefined token
            localStorage.clear();
            // Resets the form inputs and allows for error message to show up
            this.setState({
              username: "",
              password: "",
              wrongUser: true
            });
            setTimeout(() => {
              this.setState({
                wrongUser: false
              });
            }, 2000);
          } else {
            // When token is authenticated then this will fetch their cart and redirect to their profile
            this.props.handleCartFetch();
            this.props.history.push("/profile");
          }
        });
    } else {
      // If the username or password is empty then this changes state that will allow for error message
      this.setState({
        emptyLogin: true
      });
      setTimeout(() => {
        this.setState({
          emptyLogin: false
        });
      }, 2000);
    }
  };

  render() {
    return (
      <>
        <div className='login-page'>
          <div className='login-section'>
            <div className='login-header'>
              <h3>I already have an account</h3>
              <p>Sign in with your email and password</p>
              {this.state.emptyLogin ? (
                <p className='error-message'>Please enter into all fields</p>
              ) : null}
              {this.state.wrongUser ? (
                <p className='error-message'>Incorrect Username and/or Password</p>
              ) : null}
            </div>
            <form onSubmit={this.handleLoginIn}>
              <label>Username:</label>
              <br></br>
              <input
                type='text'
                value={this.state.username}
                onChange={this.handleChange}
                name='username'
                className={ this.state.emptyLogin ? !this.state.username ? 'empty-input' : null : null}
              />
              <br></br>
              <label>Password:</label>
              <br></br>
              <input
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
                name='password'
                className={ this.state.emptyLogin ? !this.state.password ? 'empty-input' : null : null}
              />
              <br></br>
              <input className='submit' type='submit' value='Log In' />
            </form>
            <br></br>
          </div>

          <div className='login-section'>

            <SignUpForm history={this.props.history} />
            <br></br>
          </div>
        </div>
      </>
    );
  }
}

export default LoginPage;
