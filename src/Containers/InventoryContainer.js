import React, { Component } from "react";
import SingleProduct from "../Components/SingleProduct";
import ProductFromContainer from '../Containers/ProductFormContainer';

class InventoryContainer extends Component {

  state = {
    addBtnClicked: false
  }

  handleAddClick = () => {
    this.setState({
      addBtnClicked: !this.state.addBtnClicked
    })
  }

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
      <>
      <div className='inventory-container'>
        <div className='inventory-header'>
          <h3></h3>
          <h3>Name:</h3>
          <h3>Color:</h3>
          <h3>Size:</h3>
          <h3>Quantity:</h3>
          <h3>Price:</h3>
          <button onClick={this.handleAddClick} id="add-product-btn">Add Product</button>
        </div>
        <div>{renderProducts}</div>
      </div>
        {this.state.addBtnClicked ? <ProductFromContainer updateQuantity={this.props.updateQuantity} handleAddClick={this.handleAddClick} /> : null }
      </>
    );
  }
}

export default InventoryContainer;
