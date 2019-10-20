import React, { Component } from "react";
import "./cart-page.styles.scss";
import CartSingleItem from "../../Components/cart-single-item/CartSingleItem";

class CartPage extends Component {
  state = {
    currentCart: {
      products: []
    },
    currentCart1: [],
    cartTotal: "",
    checkedOut: false
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
    this.props.handleCartFetch()
  };

  cartTotalSubtract = subtractPrice => {
    this.setState({
      cartTotal: this.state.cartTotal - subtractPrice
    });
    this.props.handleCartFetch()
  };

  componentDidMount() {
    fetch("https://shoppie-final-backend.herokuapp.com/profile", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedData => {
        if (localStorage.token) {
          this.fetchCart(parsedData.id);
        }
      });
  }

  fetchCart = id => {
    fetch(`https://shoppie-final-backend.herokuapp.com/cart_items/${id}`, {
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
      this.props.handleCartFetch()
  };

  renderCartPage = () => {
    this.componentDidMount()
  }

  handleCheckout = () => {
    fetch('https://shoppie-final-backend.herokuapp.com/checkout', {
      method: "POST",
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(() => this.setState({
      currentCart1: [],
      cartTotal: 0
    }))
    this.props.updateCartToZero()
    this.props.updateQuantity()
  }

  

  render() {
    const renderCartItems = this.state.currentCart1.sort((a,b) => a.id - b.id).map(item => {
      return (
        <CartSingleItem
          cartTotalAdd={this.cartTotalAdd}
          cartTotalSubtract={this.cartTotalSubtract}
          cartTotal={this.cartTotal}
          itemDetails={item}
          renderCartPage={this.renderCartPage}
          handleCartFetch={this.props.handleCartFetch}
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
              <button onClick={this.handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CartPage;
