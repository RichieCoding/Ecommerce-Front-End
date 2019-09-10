import React from "react";
import "./cart-single-item.styles.scss";

class CartSingleItem extends React.Component {
  state = {
    quantity: 1,
    price: this.props.itemDetails.price,
    adjustedPrice: this.props.itemDetails.price
  }


  handleAdd = () => {
    this.setState({
      quantity: this.state.quantity + 1,
      adjustedPrice: this.state.adjustedPrice + this.state.price
    })
    this.props.cartTotalAdd(this.state.price)
  }

  handleSubtract = () => {
    this.setState({
      quantity: this.state.quantity - 1,
      adjustedPrice: this.state.adjustedPrice - this.state.price
    })
    this.props.cartTotalSubtract(this.state.price)
  }

  // this.setState((prevState, prevProps) => {
	// 	return { meaningOfLife: prevState.meaningOfLife + prevProps.increment }

  render() {
    const { name, color, imageUrl, price, size } = this.props.itemDetails;

    return (
      <div className='cart-single-item'>
        <div className='product-image'>
          <img src={imageUrl} alt='product' style={{ width: "160px" }} />
        </div>
        <div className='product-info'>
          <div className='product-name product-text'>
            <p>{name}</p>
            <p>X</p>
          </div>
          <div className='product-size product-text'>
            <p>{`Size: ${size}`}</p>
          </div>
          <div className='product-color product-text'>
            <p>{`Color: ${color}`}</p>
          </div>
          <div className='product-price product-text'>
            <div className='product-increment'>
              <p onClick={this.handleSubtract}>-</p>
              <p>{this.state.quantity}</p>
              <p onClick={this.handleAdd}>+</p>
            </div>
            <p>{`$${this.state.adjustedPrice}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartSingleItem;
