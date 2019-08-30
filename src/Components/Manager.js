import React, { Component } from 'react'

class Manager extends Component {


  componentDidMount() {
    fetch('http://localhost:3000/users', {
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(res => res.json())
    .then(console.log)
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default Manager
