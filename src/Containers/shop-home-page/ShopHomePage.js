import React from "react";
import "./shop-home-page.styles.scss";
import { Banner } from "../../Components/banner/Banner";
import ProductCard from "../../Components/product-card/ProductCard";

const ShopHomePage = props => (
  <div className='shop-home-page'>
    <Banner title='New Arrivals' button='SHOP' />
    <div className='featured-items'>
      <h3>Featured Items</h3>
      <div className='products'>
        {props.featured.map(product => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              cartId={props.cartId}
              handleCartFetch={props.handleCartFetch}
              cart={props.cart}
            />
          );
        })}
      </div>
    </div>
  </div>
);

export default ShopHomePage;
