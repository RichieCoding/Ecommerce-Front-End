import React, { Component } from "react";
import SingleProduct from "../Components/SingleProduct";

class InventoryContainer extends Component {
  render() {
    const renderProducts = this.props.products.map(product => {
      return (
        <SingleProduct
          key={product.id}
          updateQuantity={this.props.updateQuantity}
          product={product}
        />
      );
    });
    return (
      <div className='inventory-container'>
        <div className='inventory-header'>
          <h3></h3>
          <h3>Name:</h3>
          <h3>Color:</h3>
          <h3>Size:</h3>
          <h3>Quantity:</h3>
          <h3>Price:</h3>
        </div>
        <div>{renderProducts}</div>
      </div>
    );
  }
}

export default InventoryContainer;
