import React from "react";
import "./cart-single-item.styles.scss";

class CartSingleItem extends React.Component {
  state = {
    quantity: this.props.itemDetails.count,
    price: this.props.itemDetails.products.price,
    adjustedPrice: this.props.itemDetails.products.price
  };

  //Remove Product from cart
  handleRemove = () => {
    fetch(`https://shoppie-final-backend.herokuapp.com/cart_items/${this.props.itemDetails.id}`, {
      method: "DELETE"
    })
    .then(this.props.renderCartPage())
    .then(this.props.handleCartFetch())
  }

  // deleteProduct = () => {
  //   fetch(`http://localhost:3000/products/${this.state.deleteProductId}`, {
  //     method: "DELETE"
  //   }).then(parsedData => {
  //     this.props.updateQuantity(parsedData);
  //     this.handleDeleteClick();
  //   });
  // };

  // Add count to quantity
  handleAdd = () => {
    fetch(`https://shoppie-final-backend.herokuapp.com/cart_items/${this.props.itemDetails.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        count: this.state.quantity + 1
      })
    })
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          quantity: this.state.quantity + 1,
          adjustedPrice: this.state.adjustedPrice + this.state.price
        })
      );
    this.props.cartTotalAdd(this.state.price);
  };

  handleSubtract = () => {
    fetch(`https://shoppie-final-backend.herokuapp.com/cart_items/${this.props.itemDetails.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        count: this.state.quantity - 1
      })
    })
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          quantity: this.state.quantity - 1,
          adjustedPrice: this.state.adjustedPrice - this.state.price
        }, () => {
          if (this.state.quantity === 0) {
            this.handleRemove()
          }
        })
      );
    this.props.cartTotalSubtract(this.state.price);
  };

  render() {
    const { name, color, imageUrl, size } = this.props.itemDetails.products;
    return (
      <div className='cart-single-item'>
        <div className='product-image'>
          <img src={imageUrl} alt='product' style={{ width: "160px" }} />
        </div>
        <div className='product-info'>
          <div className='product-name product-text'>
            <p>{name}</p>
            <p onClick={this.handleRemove}>X</p>
          </div>
          <div className='product-size product-text'>
            <p>{`Size: ${size}`}</p>
          </div>
          <div className='product-color product-text'>
            <p>{`Color: ${color}`}</p>
          </div>
          <div className='product-price product-text'>
            <div className='product-increment'>
              <p onClick={this.handleSubtract}>-</p>
              <p>{this.state.quantity}</p>
              <p onClick={this.handleAdd}>+</p>
            </div>
            <p>{`$${this.state.price * this.state.quantity}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSingleItem;
