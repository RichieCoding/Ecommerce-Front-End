import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import HamburgerMenu from "react-hamburger-menu";
import { connect } from "react-redux";

const Header = props => {
  const handleClick = () => {
    localStorage.clear();
    props.handleCartFetch();
    props.setCartToZero();
  };

  const addTotal = () => {
    let totalCart = 0;
    if (props.cart !== undefined) {
      props.cart.map(item => (totalCart += item.count));
    }
    return totalCart;
  };

  return (
    <nav>
      <div className='hamburger-menu'>
        <HamburgerMenu
          isOpen={props.isOpen}
          menuClicked={props.handleMenuOpen}
          width={25}
          height={18}
          color={"black"}
        />
      </div>
      <h3 className='logo'>
        <Link to='/' onClick={props.handleMenuClose}>
          Shoppie
        </Link>
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
          <li onClick={handleClick}>
            <Link to='/'>{`Log Out ${props.currentUser}`}</Link>
          </li>
        ) : null}
      </ul>
      <div className='menu-cart'>
        <div className='cart-text'>
          <Link to='/cart' onClick={props.handleMenuClose}>
            <span>Cart: </span>
            {props.cartItems.length}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  cartItems: state.cart.cartItems
});

export default connect(mapStateToProps)(Header);
