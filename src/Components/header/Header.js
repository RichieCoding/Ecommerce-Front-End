import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";

class Header extends Component {
  handleClick = () => {
    localStorage.clear();
    this.props.handleCartFetch()
    // this.props.history.push('/')
  };

  render() {
    // debugger
    // if (!this.props.cart.length) return null;
    console.log(this.props)
    return (
      <nav>
        <h1 id='title'>Blips &amp; Chitz</h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {localStorage.token ? (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          ) : (
            <li>
              <Link to='/login'>Login</Link>
            </li>
          )}
          {localStorage.token ? (
            <li onClick={this.handleClick}>
              <Link to='/'>Log out</Link>
            </li>
          ) : null}
          <li>

            {/* <Link to='/'>
              {Object.keys(this.props).length  ? (
                Object.keys(this.props.cart).length ? (
                  <a>Cart{this.props.cart.cart_items.length}</a>
                ) : (
                  <a></a>
                )
              ) : null}
            </Link> */}
            { !this.props.currentUser.admin ? <li><Link to='/cart'>{`Cart(${this.props.cart.products.length})`}</Link>  </li> : null}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
