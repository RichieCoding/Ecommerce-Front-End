import React, { Component } from "react";
import "./single-product-page.styles.scss";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";

class SingleProductPage extends Component {
  state = {
    product: {},
    sizeLetter: "",
    status: "Add to cart",
    loading: true
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    fetch(`https://shoppie-final-backend.herokuapp.com/products/${productId}`)
      .then(res => res.json())
      .then(parsedData => {
        console.log(parsedData);
        this.setState({
          product: parsedData,
          sizeLetter: parsedData.size.charAt(0),
          loading: false
        });
        const { quantity } = parsedData;
        if (quantity === 0) {
          this.setState({
            status: "SOLD OUT"
          });
        } else if (this.props.cart.length !== 0) {
          for (let i = 0; i < this.props.cart.length; i++) {
            if (this.props.cart[i].product_id === this.state.product.id) {
              this.setState({
                status: "Added"
              });
            }
          }
        }
      });
  }

  addToCart = () => {
    const findProduct = this.props.cart.find(cartItem => {
      return cartItem.product_id === this.state.product.id;
    });
    if (!findProduct) {
      console.log("not in cart");
      fetch(`https://shoppie-final-backend.herokuapp.com/cart_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          cart_id: this.props.cartId,
          product_id: this.state.product.id
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
  };

  renderSizeLetter = () => {
    console.log(this.state.sizeLetter);
  };

  render() {
    if (this.state.loading) return <Spinner />
    const {
      name,
      color,
      imageUrl,
      price,
      description,
      size
    } = this.state.product;
    return (
      <>
        <div className='back-btn-container'>
          <Link to='/shop'>
            <p className='back-btn'>Back to products</p>
          </Link>
        </div>

        <div className='single-product-page'>
          <div className='product-container'>
            <h3 className='product-name'>{name}</h3>
            <h3 className='product-price'>{`$${price}.00`}</h3>
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
            <hr />
          </div>

          <div className='size-wrapper'>
            <p className='size-text'>{size}</p>
            <div className='product-size'>
              <div className='size-container'>
                <p className='size-letter'>{this.state.sizeLetter}</p>
              </div>
            </div>
          </div>

          <div className='add-to-cart-btn'>
            {this.state.status === "SOLD OUT" ? (
              <button className='add-to-cart'>{this.state.status}</button>
            ) : (
              <button onClick={this.addToCart} className='add-to-cart'>
                {this.state.status}
              </button>
            )}
          </div>

          <div className='product-description'>
            <p className='detail-title'>Details</p>
            <p className='detail-description'>{description}</p>
          </div>
        </div>
      </>
    );
  }
}

export default SingleProductPage;
