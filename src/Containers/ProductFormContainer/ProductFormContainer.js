import React, { Component } from "react";
import ProductForm from "../../Components/ProductForm";
import './product-form-container.styles.scss';

const ProductFormContainer = ({
  title,
  handleAddClick,
  product,
  updateQuantity,
  ...otherProps
}) => (
  <div className='product-form-container'>
    <header>
      <h2>{title}</h2>
      <button onClick={handleAddClick}>X</button>
    </header>
    {title === "Add a Product" || title === "Edit a Product" ? (
      <ProductForm
        product={product}
        updateQuantity={updateQuantity}
        handleAddClick={handleAddClick}
      />
    ) : null}
  </div>
);

export default ProductFormContainer;
