import React, { Component } from 'react'

class HomePage extends Component {

  state = {
    username: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/profile', {
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(res => res.json())
    .then(profileInfo => this.setState({
      username: profileInfo.first_name 
    }))
  }

  render() {
    return (
      <div>
        <h1>Profile Page you're {this.state.username}</h1>
      </div>
    )
  }
}

export default HomePage
