import React, { Component } from "react";
import SingleProduct from "../Components/SingleProduct";
import ProductFromContainer from "../Containers/ProductFormContainer";
import ConfirmDelete from "../Components/ConfirmDelete";

class InventoryContainer extends Component {
  state = {
    addBtnClicked: false,
    deleteBtnClicked: false
  };

  handleAddClick = () => {
    if (this.state.deleteBtnClicked) {
      this.setState({
        deleteBtnClicked: false,
        addBtnClicked: !this.state.addBtnClicked
      });
    } else {
      this.setState({
        addBtnClicked: !this.state.addBtnClicked
      });
    }
  };

  handleDeleteClick = () => {
    if (this.state.addBtnClicked) {
      this.setState({
        addBtnClicked: false,
        deleteBtnClicked: !this.state.deleteBtnClicked
      });
    } else {
      this.setState({
        deleteBtnClicked: !this.state.deleteBtnClicked
      });
    }
  };

  getUserId = id => {
    this.handleDeleteClick();
    this.setState({
      deleteProductId: id
    });
  };

  deleteProduct = () => {
    console.log("yay it works");
    console.log("delete");
    fetch(`http://localhost:3000/products/${this.state.deleteProductId}`, {
      method: "DELETE"
    }).then(parsedData => {
      this.props.updateQuantity(parsedData);
      this.handleDeleteClick();
    });
  };

  render() {
    const renderProducts = this.props.products.map(product => {
      return (
        <SingleProduct
          key={product.id}
          handleDeleteClick={this.handleDeleteClick}
          updateQuantity={this.props.updateQuantity}
          product={product}
          deleteState={this.state.deleteBtnClicked}
          getUserId={this.getUserId}
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
            <button onClick={this.handleAddClick} id='add-product-btn'>
              Add Product
            </button>
          </div>
          <div>{renderProducts}</div>
        </div>

        {/* Renders Add Product Form  */}
        {this.state.addBtnClicked ? (
          <ProductFromContainer
            updateQuantity={this.props.updateQuantity}
            handleAddClick={this.handleAddClick}
          />
        ) : null}

        {/* Renders Delete Confirm */}
        {this.state.deleteBtnClicked ? (
          <ConfirmDelete
            handleDeleteClick={this.handleDeleteClick}
            updateQuantity={this.props.updateQuantity}
            deleteProduct={this.deleteProduct}
          />
        ) : null}
      </>
    );
  }
}

export default InventoryContainer;
