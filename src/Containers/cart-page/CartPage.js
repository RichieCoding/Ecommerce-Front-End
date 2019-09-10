import React, { Component } from "react";
import "./cart-page.styles.scss";
import CartSingleItem from "../../Components/cart-single-item/CartSingleItem";

class CartPage extends Component {
  state = {
    currentCart: {
      products: []
    },
    cartTotal: ""
  };

  cartTotal = () => {
    let total = 0;
    this.state.currentCart.products.map(product => {
      total += product.price;
    });
    this.setState({
      cartTotal: total
    });
  };

  cartTotalAdd = (addPrice) => {
    this.setState({
      cartTotal: this.state.cartTotal + addPrice
    })
  }

  cartTotalSubtract = (subtractPrice) => {
    this.setState({
      cartTotal: this.state.cartTotal - subtractPrice
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(parsedData => {
      // if (localStorage.token) {
      //   this.fetchCartItems(parsedData.cart.id)
      // }
      if (localStorage.token) {
        this.fetchCart(parsedData.cart.id);
      }
      
    });
  }

  fetchCart = id => {
    fetch(`http://localhost:3000/carts/${id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedData => {
        this.setState({
          currentCart: parsedData
        });
        this.cartTotal()
      });
  };

  render() {
    const renderCartItems = this.state.currentCart.products.map(item => {
      return <CartSingleItem cartTotalAdd={this.cartTotalAdd} cartTotalSubtract={this.cartTotalSubtract} cartTotal={this.cartTotal} itemDetails={item} />;
    });
    return (
      <>
        <div className='cart-page'>
          <div>{renderCartItems}</div>
          <div className='checkout'>
            <div className='order-summary'>
              <p>Order Summary</p>
            </div>
            <div className='cart-total'>
              <p>Order Total</p>
              <p>${this.state.cartTotal}</p>
            </div>
            <div className='checkout'>
              <button>Checkout</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartPage;
