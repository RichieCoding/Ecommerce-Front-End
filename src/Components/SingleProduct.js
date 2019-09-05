import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';



export class SingleProduct extends Component {

  handleUpClick = () => {
    fetch(`http://localhost:3000/products/${this.props.product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        quantity: this.props.product.quantity + 1
      })
    })
    .then(resp => resp.json())
    .then(parsedInfo => {
      this.props.updateQuantity(parsedInfo)
    })
  }

  handleDownClick = () => {
    fetch(`http://localhost:3000/products/${this.props.product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        quantity: this.props.product.quantity - 1
      })
    })
    .then(resp => resp.json())
    .then(parsedInfo => {
      this.props.updateQuantity(parsedInfo)
    })
  }

  handleDelete = () => {
    console.log('delete')
    fetch(`http://localhost:3000/products/${this.props.product.id}`, {
      method: "DELETE"
    })
    .then(parsedData => {
      this.props.updateQuantity(parsedData)
    })
  }

  render() {
    const { name, color, size, quantity, price, imageUrl } = this.props.product;
    return (
      <div className='single-user single-product'>
        <img src={imageUrl} alt="product" style={{width: '50px'}}/>
        <h3>{name}</h3>
        <h3>{color}</h3>
        <div>
          <h3>{size}</h3>
        </div>
        <div style={{userSelect: "none"}}>
          <span><FontAwesomeIcon icon={faArrowAltCircleDown} onClick={this.handleDownClick}/></span>
          <h3 id='quantity' style={{ display: "inline-block" }}>{quantity}</h3>
          <span><FontAwesomeIcon icon={faArrowAltCircleUp} onClick={this.handleUpClick}/></span>
        </div>
        <h3>{`$${price}`}</h3>
        <div>
          <button id="product-edit-btn">Edit</button>
          <button onClick={this.handleDelete} id="product-remove-btn">X</button>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
