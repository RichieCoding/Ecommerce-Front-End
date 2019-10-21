import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";

class Header extends Component {
  state = {
    cartLength: ""
  };

  handleClick = () => {
    localStorage.clear();
    this.props.handleCartFetch();
    this.props.setCartToZero();
    // this.props.history.push('/')
  };

  addTotal = () => {
    let totalCart = 0;
    if (this.props.cart !== undefined) {
      this.props.cart.map(item => (totalCart += item.count));
    }
    return totalCart;
  };

  render() {
    // debugger
    // if (!this.props.cart.length) return null;
    console.log(this.props);
    return (
      <nav>
        <h3 className='shop-title'>
          <Link to='/shop'>Shop</Link>
        </h3>
        <ul>
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
            {!this.props.currentUser.admin ? (
              <li className='cart-text'>
                <Link to='/cart'>{`Cart: ${this.addTotal()}`}</Link>{" "}
              </li>
            ) : null}
          </li>
        </ul>
        <div className={'logo'}>
          <Link to='/'><h1 id='title'>Shoppie</h1></Link>
        </div>
      </nav>
    );
  }
}

export default Header;
