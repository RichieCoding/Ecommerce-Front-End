import React from "react";
import "./cart-single-item.styles.scss";

class CartSingleItem extends React.Component {
  state = {
    quantity: this.props.itemDetails.count,
    price: this.props.itemDetails.products.price,
    adjustedPrice: this.props.itemDetails.products.price
  };

  // Add count to quantity
  handleAdd = () => {
    fetch(`http://localhost:3000/cart_items/${this.props.itemDetails.id}`, {
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
    fetch(`http://localhost:3000/cart_items/${this.props.itemDetails.id}`, {
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
            <p>X</p>
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
