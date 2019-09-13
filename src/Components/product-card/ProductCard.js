import React, { Component } from "react";
import "./product-card.styles.scss";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  state={
    hover: false,
    status: ''
  }

  componentDidMount() {
    debugger
    const { quantity } = this.props.product;
    if (quantity === 0) {
      this.setState({
        status: 'SOLD OUT'
      })
    } else if (this.props.cart.includes(this.props.product.id)) {
      this.setState({
        status: 'Added'
      })
    } else {
      this.setState({
        status: 'Add to cart'
      })
    }
  }

  addToCart = () => {
    this.setState({
      status: 'Added'
    })
    const findProduct = this.props.cart.find(cartItem => {
      return cartItem.product_id === this.props.product.id;
    });
    if (findProduct) {
      console.log(findProduct);
    } else {
      console.log("not in cart");
      fetch(`http://localhost:3000/cart_items`, {
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
        .then(this.props.handleCartFetch);
    }
    this.componentDidMount()
  };

  handleMouseEnter = () => {
    this.setState({
      hover: true
    })
  }

  handleMouseLeave = () => {
    this.setState({
      hover: false
    })
  }

  handleAddToCartButton = () => {
    const { quantity } = this.props.product;
    if (quantity === 0) {
      return <h4>SOLD OUT</h4>;
    } else if (quantity > 0 && quantity <= 5) {
      return (
          <h4>Low Stock: {quantity}</h4>
      );
    }
  };

  render() {
    return (
      <div className='product-card'>
        {/* <Link to={`/shop/${props.product.id}`}> */}
        <div onMouseEnter = {this.handleMouseEnter}
            onMouseLeave = {this.handleMouseLeave} className='product-image'>
          <img 
            style={{filter: 'blur(4px)'}}
            src={this.props.product.imageUrl}
            alt='product'
            style={{ width: "260px" }}
          />
          {this.state.hover || this.state.status === "SOLD OUT" ? <button onClick={this.addToCart} className='hover-add-to-cart'>{this.state.status}</button> : null}
          {/* <div className='hover-add-to-cart'>
            <h3>Add to cart</h3>
          </div> */}
        </div>
        {/* </Link> */}
        <div className='product-info'>
          <p>{this.props.product.name}</p>
          <p>${this.props.product.price}.00</p>
          {this.handleAddToCartButton()}
          {/* <button onClick={this.addToCart}>Add To Cart</button> */}
        </div>
      </div>
    );
  }
}

export default ProductCard;
