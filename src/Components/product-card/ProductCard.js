import React, { Component } from "react";
import "./product-card.styles.scss";
import { Link } from "react-router-dom";

import URL from '../URL'

class ProductCard extends Component {
  state = {
    hover: false,
    status: "Add to cart"
  };

  componentDidMount() {
    const { quantity } = this.props.product;
    if (quantity === 0) {
      this.setState({
        status: "SOLD OUT"
      });
    } else if (this.props.cart.length !== 0) {
      for (let i = 0; i < this.props.cart.length; i++) {
        if (this.props.cart[i].product_id === this.props.product.id) {
          this.setState({
            status: "Added"
          });
        }
      }
    }
  }

  addToCart = () => {
    const findProduct = this.props.cart.find(cartItem => {
      return cartItem.product_id === this.props.product.id;
    });
    if (findProduct) {
      console.log(findProduct);
    } else {
      console.log("not in cart");
      fetch(`${URL}/cart_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          cart_id: this.props.cartId,
          product_id: this.props.product.id
        })
      })
        .then(resp => resp.json())
        .then(res => {
          this.setState({
            status: "Added"
          });
          this.props.handleCartFetch();
        });
    }
    this.componentDidMount();
  };

  handleMouseEnter = () => {
    this.setState({
      hover: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hover: false
    });
  };

  handleStockInfo = () => {
    const { quantity } = this.props.product;
    if (quantity === 0) {
      return <h4>SOLD OUT</h4>;
    } else if (quantity > 0 && quantity <= 5) {
      return <h4>Low Stock: {quantity}</h4>;
    }
  };

  renderAddToCartBtn = () => {
    if (this.state.status === "SOLD OUT" || this.state.status === "Added") {
      return <p className={this.state.status === "SOLD OUT" ? 'hover-add-to-cart hover-sold-out' : 'hover-add-to-cart'}>{this.state.status}</p>;
    } else {
      return (
        <button onClick={this.addToCart} className='hover-add-to-cart'>
          {this.state.status}
        </button>
      );
    }
  };

  render() {
    return (
      <div className='product-card'>
        <div
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          className='product-image'
        >
          <Link to={`/shop/${this.props.product.id}`}>
            <img
              className='product-img'
              src={this.props.product.imageUrl}
              alt='product'
            />
          </Link>
          {this.state.hover ||
          this.state.status === "SOLD OUT" ||
          this.state.status === "Added"
            ? this.renderAddToCartBtn()
            : null}
        </div>

        <div className='product-info'>
          <p>{this.props.product.name}</p>
          <p>${this.props.product.price}.00</p>
          {this.handleStockInfo()}
        </div>
      </div>
    );
  }
}

export default ProductCard;
