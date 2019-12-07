import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import HamburgerMenu from "react-hamburger-menu";

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
    return (
      <nav>
        <div className='hamburger-menu'>
            <HamburgerMenu
              isOpen={this.props.isOpen}
              menuClicked={this.props.handleMenuOpen}
              width={25}
              height={18}
              color={"black"}
            />
          </div>
        <h3 className='logo'>
          <Link to='/' onClick={this.props.handleMenuClose}>Shoppie</Link>
        </h3>
        <ul className='main-nav'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/shop'>Shop</Link>
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
        </ul>
        <div className='menu-cart'>
          <div className='cart-text'>
            <Link to='/cart' onClick={this.props.handleMenuClose}><span>Cart: </span>{this.addTotal()}</Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;