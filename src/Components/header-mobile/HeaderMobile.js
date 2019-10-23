import React, { Component } from "react";
import "./header-mobile.styles.scss";
import { Link } from "react-router-dom";

class HeaderMobile extends Component {

  handleClick = () => {
    this.props.menuClicked();
    localStorage.clear();
    this.props.handleCartFetch();
    this.props.setCartToZero();
  };

  render() {
    return (
      <div className='header-mobile'>
        <Link to='/' onClick={this.props.menuClicked}>
          <h3>Home</h3>
        </Link>
        <Link to='/shop' onClick={this.props.menuClicked}>
          <h3>Shop</h3>
        </Link>
        {localStorage.token ? (
          <Link to='/profile' onClick={this.props.menuClicked}>
            <h3>Profile</h3>
          </Link>
        ) : (
          <Link to='/login' onClick={this.props.menuClicked}>
            <h3>Login</h3>
          </Link>
        )}
        {localStorage.token ? (
          <Link to='/' onClick={this.handleClick}>
            <h3>Log out</h3>
          </Link>
        ) : null}
      </div>
    );
  }
}

export default HeaderMobile;
