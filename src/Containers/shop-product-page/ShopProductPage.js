import React, { Component } from "react";
import "./shop-product-page.styles.scss";
import ProductCard from "../../Components/product-card/ProductCard";
import Spinner from '../../Components/Spinner/Spinner'

class ShopProductPage extends Component {

  render() {
    const renderProductCards = this.props.products.map(product => {
      return (
        <ProductCard
          cart={this.props.cart}
          cartId={this.props.cartId}
          product={product}
          handleCartFetch={this.props.handleCartFetch}
        />
      );
    });
    const { productsLoaded } = this.props
    if (!productsLoaded) return <Spinner />
    return <div className='shop-product-page'>{renderProductCards}</div>;
  }
}

export default ShopProductPage;
