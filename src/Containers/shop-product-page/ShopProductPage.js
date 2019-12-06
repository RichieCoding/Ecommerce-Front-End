import React, { Component } from "react";
import "./shop-product-page.styles.scss";
import ProductCard from "../../Components/product-card/ProductCard";
import Spinner from "../../Components/Spinner/Spinner";

const ShopProductPage = (props) => {
  const renderProductCards = props.products.map(product => {
    return (
      <ProductCard
        cart={props.cart}
        cartId={props.cartId}
        product={product}
        handleCartFetch={props.handleCartFetch}
      />
    );
  });
  const { productsLoaded } = props;
  if (!productsLoaded) return <Spinner />;
  return <div className='shop-product-page'>{renderProductCards}</div>;
};

export default ShopProductPage;
