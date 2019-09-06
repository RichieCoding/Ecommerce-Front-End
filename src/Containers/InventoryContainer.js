import React, { Component } from "react";
import SingleProduct from "../Components/SingleProduct";
import ProductFormContainer from "../Containers/ProductFormContainer";
import ConfirmDelete from "../Components/ConfirmDelete";

class InventoryContainer extends Component {
  state = {
    addBtnClicked: false,
    deleteBtnClicked: false,
    editBtnClicked: false
  };

  // Function that handles the modal popup for the add product button  
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

  // Function that handles the modal popup for the delete button  
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

  // Grabs UserID by passing this function to SingleProduct Component
  getUserId = id => {
    this.handleDeleteClick();
    this.setState({
      deleteProductId: id
    });
  };

  // Deletes a product
  deleteProduct = () => {
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

        {/* Renders Add Product Form Modal */}
        {this.state.addBtnClicked ? (
          <ProductFormContainer
            updateQuantity={this.props.updateQuantity}
            handleAddClick={this.handleAddClick}
          />
        ) : null}

        {/* Renders Delete Confirm Modal */}
        {this.state.deleteBtnClicked ? (
          <ConfirmDelete
            handleDeleteClick={this.handleDeleteClick}
            updateQuantity={this.props.updateQuantity}
            deleteProduct={this.deleteProduct}
          />
        ) : null}
        {/* Renders Edit Product Form Modal */}
        {this.state.editBtnClicked ? (
          <ProductFormContainer />
        ) : null}
      </>
    );
  }
}

export default InventoryContainer;
