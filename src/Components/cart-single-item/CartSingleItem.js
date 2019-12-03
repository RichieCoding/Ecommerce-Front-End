import React from "react";
import "./cart-single-item.styles.scss";
import { Link } from 'react-router-dom';
import URL from '../../Components/URL';

class CartSingleItem extends React.Component {
  state = {
    quantity: this.props.itemDetails.count,
    price: this.props.itemDetails.products.price,
    adjustedPrice: this.props.itemDetails.products.price
  };

  //Remove Product from cart
  handleRemove = () => {
    fetch(`${URL}/cart_items/${this.props.itemDetails.id}`, {
      method: "DELETE"
    })
    .then(this.props.renderCartPage())
    .then(this.props.handleCartFetch())
  }

  // Add count to quantity
  handleAdd = () => {
    fetch(`${URL}/cart_items/${this.props.itemDetails.id}`, {
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
    fetch(`${URL}/cart_items/${this.props.itemDetails.id}`, {
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
    const { name, color, imageUrl, size, id } = this.props.itemDetails.products;
    return (
      <div className='cart-single-item'>
        <div className='product-image'>
          <Link to={`/shop/${id}`}><img src={imageUrl} alt='product' style={{ width: "160px" }} /></Link>
        </div>
        <div className='product-info'>
          <div className='product-name product-text'>
            <Link to={`/shop/${id}`}><p>{name}</p></Link>
            <p onClick={this.handleRemove} className='delete-cart-item'>X</p>
          </div>
          <div className='product-size product-text'>
            <p>{`Size: ${size}`}</p>
          </div>
          <div className='product-color product-text'>
            <p>{`Color: ${color}`}</p>
          </div>
          <div className='product-price product-text'>
            <div className='product-increment'>
              <p className='add-subtract' onClick={this.handleSubtract}>-</p>
              <p>{this.state.quantity}</p>
              <p className='add-subtract' onClick={this.handleAdd}>+</p>
            </div>
            <p>{`$${this.state.price * this.state.quantity}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSingleItem;
