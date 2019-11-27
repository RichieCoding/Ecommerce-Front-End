import React from "react";
import "./shop-home-page.styles.scss";
// import { Link } from "react-router-dom";
import { Banner } from "../../Components/banner/Banner";

const ShopHomePage = () => (
  <div className='shop-home-page'>
    <Banner title='New Arrivals' button='SHOP' />
    {/* <div className='featured-items'>
      <h3>Featured Items</h3>
    </div> */}
  </div>
);

export default ShopHomePage;
