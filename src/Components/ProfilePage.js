import React, { Component } from 'react'
import Manager from './Manager'
import AdminOverviewContainer from '../Containers/AdminOverviewContainer'

class ProfilePage extends Component {

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
        <AdminOverviewContainer />
      </div>
    )
  }
}

export default ProfilePage
