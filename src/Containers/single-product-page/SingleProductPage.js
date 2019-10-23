import React, { Component } from "react";
import "./single-product-page.styles.scss";
import { Link } from "react-router-dom";

class SingleProductPage extends Component {
  state = {
    product: {},
    sizeLetter: ""
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    fetch(`https://shoppie-final-backend.herokuapp.com/products/${productId}`)
      .then(res => res.json())
      .then(parsedData => {
        this.setState({
          product: parsedData,
          sizeLetter: parsedData.size.charAt(0)
        });
      });
  }

  renderSizeLetter = () => {
    console.log(this.state.sizeLetter);
  };

  render() {
    const {
      name,
      color,
      imageUrl,
      price,
      description,
      size
    } = this.state.product;
    return (
      <div className='single-product-page'>
        <Link to='/shop'>
          <p className='back-btn'>Back to products</p>
        </Link>
        <div className='product-name'>
          <h3>{name}</h3>
        </div>

        <div className='product-price'>
          <h3>{`$${price}.00`}</h3>
        </div>

        <div className='product-image'>
          <img src={imageUrl} alt='product' />
        </div>

        <div className='color-wrapper'>
          <div className='color-container'>
            <div
              className='product-color'
              style={{ background: `${color}` }}
            ></div>
          </div>
          <p className='color-text'>{color}</p>
        </div>

        <hr />

        <p>{size}</p>
        <div className='product-size'>
          <div className='size-container'>
            <p className='size-letter'>{this.state.sizeLetter}</p>
          </div>
        </div>

        <div className='add-to-cart-btn'>
          <button onClick={this.addToCart} className='add-to-cart'>
            Add to cart
          </button>
        </div>

        <div className='product-description'>
          <p className='detail-title'>Details</p>
          <p className='detail-description'>{description}</p>
        </div>
        
      </div>
    );
  }
}

export default SingleProductPage;
