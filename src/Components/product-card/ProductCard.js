import React, { Component } from "react";
import "./product-card.styles.scss";
import { Link } from "react-router-dom";

class ProductCard extends Component {

  addToCart = () => {
    const findProduct = this.props.cart.find(cartItem => {
      return cartItem.product_id === this.props.product.id
    })
    if (findProduct) {
      console.log(findProduct)

    } else {
      console.log('not in cart')
      fetch(`http://localhost:3000/cart_items`, {
        method: 'POST',
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
      .then(this.props.handleCartFetch)
    }
  }

  // fetch("http://localhost:3000/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({
  //       first_name: userInfo.firstName,
  //       last_name: userInfo.lastName,
  //       phone_number: userInfo.phoneNumber,
  //       ...userInfo
  //     })
  //   })
  //     .then(resp => resp.json())
  //     .then(this.props.history.push("/login"));
  // };

  render() {
    return (
      <div className='product-card'>
    {/* <Link to={`/shop/${props.product.id}`}> */}
      <div className='product-image'>
        <img
          src={this.props.product.imageUrl}
          alt='product'
          style={{ width: "260px" }}
        />
      </div>
    {/* </Link> */}
    <div className='product-info'>
      <p>{this.props.product.name}</p>
      <p>${this.props.product.price}.00</p>
      <button onClick={this.addToCart}>Add To Cart</button>
    </div>
  </div>
    )
  }
}

export default ProductCard;
