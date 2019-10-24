import React from 'react';
import './shop-home-page.styles.scss';
import Shoppie from '../../assets/images/ShoppieBanner.png';
import { Link } from 'react-router-dom';


const ShopHomePage = () => (
  <div className='shop-home-page'>
    <div className='banner'>
      <img src={Shoppie} alt="banner"/>
    </div>
  </div>
)

export default ShopHomePage