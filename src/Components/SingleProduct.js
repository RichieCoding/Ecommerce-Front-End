import React, { Component } from 'react'

export class SingleProduct extends Component {
  render() {
    const { name, color, size, quantity, price} = this.props.product
    return (
      <div className='single-user single-product'>
        <h3>{name}</h3>
        <h3>{color}</h3>
        <div><h3>{size}</h3></div>
        <div><h3 style={{display: 'inline-block'}}>{quantity}</h3></div>
        <h3>{`$${price}`}</h3>
      </div>
    )
  }
}

export default SingleProduct
