import React, { Component } from 'react'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';

class ProductFormContainer extends Component {
  render() {
    return (
      <div className="product-form-container">
        <header>
          <h2>Add a Product</h2>
          <button onClick={this.props.handleAddClick}>X</button>
        </header>
        <div className="product-form-wrapper">
          <form>
            <label htmlFor="name">Product Name:</label><br></br>
            <input type="text" id="name"/><br></br>
            <label htmlFor="color">Color:</label><br></br>
            <input type="text" id="color"/><br></br>
            <label htmlFor="size">Size:</label><br></br>
            <input type="text" id="size"/><br></br>
            <label htmlFor="quantity">Quantity:</label><br></br>
            <input type="number" id="quantity"/><br></br>
            <label htmlFor="price">Price:</label><br></br>
            <input type="text" id="price"/><br></br>
            <label htmlFor="varientID">VarientID:</label><br></br>
            <input type="text" id="varientID"/><br></br>
            <label htmlFor="image">ImageURL:</label><br></br>
            <input type="text" id="image"/><br></br>
            <label htmlFor="description">Description:</label><br></br>
            <textarea type="text" id="description"></textarea><br></br>
            <input id="product-form-submit-btn" type="submit"/>
          </form>
        </div>
      </div>
    )
  }
}


export default ProductFormContainer
