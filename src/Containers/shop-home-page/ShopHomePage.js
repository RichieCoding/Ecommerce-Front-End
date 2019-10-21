import React from 'react';
import './shop-home-page.styles.scss';
import Shoppie from '../../assets/images/ShoppieBanner.png';
import { Link } from 'react-router-dom';


const ShopHomePage = () => (
  <div className='shop-home-page'>
    <div className='banner'>
      <img src={Shoppie} alt="banner"/>
    </div>
    <div className="secondary-banner">
      <Link to='/shop'><div className="first small-banner"><h3>SHOP</h3></div></Link>
      <Link to='/profile'><div className="second small-banner"><h3>PROFILE</h3></div></Link>
    </div>
  </div>
)

export default ShopHomePage