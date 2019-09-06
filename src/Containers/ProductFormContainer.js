import React, { Component } from 'react'
import ProductForm from '../Components/ProductForm'

const ProductFormContainer = ({title, handleAddClick, product, updateQuantity}) => (
  <div className="product-form-container">
        <header>
          <h2>{title}</h2>
          <button onClick={handleAddClick}>X</button>
        </header>
        <ProductForm product={product} updateQuantity={updateQuantity} handleAddClick={handleAddClick}/>
      </div>
)

export default ProductFormContainer
