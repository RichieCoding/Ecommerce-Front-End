import React, { Component } from "react";
import "./cart-page.styles.scss";
import CartSingleItem from "../../Components/cart-single-item/CartSingleItem";

class CartPage extends Component {
  state = {
    currentCart: {
      products: []
    },
    // currentCartCount: {
    //   count_items: []
    // },
    currentCart1: [],
    cartTotal: ""
  };

  cartTotal = () => {
    let total = 0;
    this.state.currentCart1.map(cartProduct => {
     total += cartProduct.products.price * cartProduct.count;
    });
    this.setState({
      cartTotal: total
    });
  };

  cartTotalAdd = addPrice => {
    this.setState({
      cartTotal: this.state.cartTotal + addPrice
    });
    this.props.getCartAgain()
  };

  cartTotalSubtract = subtractPrice => {
    this.setState({
      cartTotal: this.state.cartTotal - subtractPrice
    });
    this.props.getCartAgain()
  };

  componentDidMount() {
    fetch("http://localhost:3000/profile", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedData => {
        // debugger
        // if (localStorage.token) {
        //   this.fetchCartItems(parsedData.cart.id)
        // }
        if (localStorage.token) {
          this.fetchCart(parsedData.id);
        }
      });
  }

  fetchCart = id => {
    fetch(`http://localhost:3000/cart_items/${id}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedData => {
        // debugger
        this.setState({
          currentCart1: parsedData
        });
        this.cartTotal();
      });
  };

  render() {
    const renderCartItems = this.state.currentCart1.sort((a,b) => a.id - b.id).map(item => {
      return (
        <CartSingleItem
          cartTotalAdd={this.cartTotalAdd}
          cartTotalSubtract={this.cartTotalSubtract}
          cartTotal={this.cartTotal}
          itemDetails={item}
        />
      );
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
