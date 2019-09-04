import React, { Component } from "react";
import UserForms from "./UserForms";

class SingleUser extends Component {
  state = {
    clicked: false
  };

  render() {
    const { first_name, username, email, id } = this.props.users;
    return (
      <div className='single-user single-user-grid'>
        <h3>{first_name}</h3>
        <h3>{username}</h3>
        <h3>{email}</h3>
        <button
          onClick={e => {
            this.setState({
              clicked: !this.state.clicked
            });
          }}
        >
          Edit
        </button>
        {this.state.clicked ? (
          <UserForms
            handleSubmit={this.props.handleSubmit}
            userInfo={this.props.users}
            userId={id}
          />
        ) : null}
      </div>
    );
  }
}

export default SingleUser;
