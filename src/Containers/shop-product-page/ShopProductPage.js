import React, { Component } from "react";
import "./shop-product-page.styles.scss";
import { Link } from "react-router-dom";
import ProductCard from "../../Components/product-card/ProductCard";

class ShopProductPage extends Component {

  render() {
    const renderProductCards = this.props.products.map(product => {
      return (
        <ProductCard
          cart={this.props.cart}
          cartId={this.props.cartId}
          addToCart={this.addToCart}
          product={product}
          handleCartFetch={this.props.handleCartFetch}
        />
      );
    });
    return <div className='shop-product-page'>{renderProductCards}</div>;
  }
}

export default ShopProductPage;
