import React from 'react'
import './order-single-product.styles.scss'

const OrderSingleProduct = ({imageUrl, name, size, price}) => {
  return (
    <div className='order-single-product'>
      <p>1</p>
      <img src={imageUrl} alt="product" style={{width: "50px"}}/>
      <p>{name}</p>
      <p>{size}</p>
      <p>{price}</p>
    </div>
  )
}

export default OrderSingleProduct;