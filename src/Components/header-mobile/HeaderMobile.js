import React from 'react';
import './header-mobile.styles.scss';
import { Link } from 'react-router-dom';

const HeaderMobile = ({ menuClicked }) => {
  const handleClick = () => {
    this.props.menuClicked();
    localStorage.clear();
    this.props.handleCartFetch();
    this.props.setCartToZero();
  };

  return (
    <div className='header-mobile'>
      <Link to='/' onClick={menuClicked}>
        <h3>Home</h3>
      </Link>
      <Link to='/shop' onClick={menuClicked}>
        <h3>Shop</h3>
      </Link>
      {localStorage.token ? (
        <Link to='/profile' onClick={menuClicked}>
          <h3>Profile</h3>
        </Link>
      ) : (
        <Link to='/login' onClick={menuClicked}>
          <h3>Login</h3>
        </Link>
      )}
      {localStorage.token ? (
        <Link to='/' onClick={handleClick}>
          <h3>Log out</h3>
        </Link>
      ) : null}
    </div>
  );
};

export default HeaderMobile;
