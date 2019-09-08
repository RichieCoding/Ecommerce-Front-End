import React, { Component } from "react";
import "./admin-show-order.styles.scss";
import OrderSingleProduct from "../orders-single-product/OrderSingleProduct";

class AdminShowOrder extends Component {

  totalPrice = () => {
    let totalPrice = 0;
    this.props.orderDetails.products.forEach(product => {
      totalPrice += product.price
    })
    return totalPrice
  }

  render() {
    // console.log(this.props.orderDetails)
    const renderProducts = this.props.orderDetails.products.map(product => {
      return (
        <OrderSingleProduct
          name={product.name}
          imageUrl={product.imageUrl}
          size={product.size}
          price={product.price}
          totalPrice={this.totalPrice}
        />
      );
    });
    const { id, date, time, user } = this.props.orderDetails;
    console.log(this.totalPrice())
    return (
      <div className='admin-show-order'>
        <header>
          <div className='order-date'>
            <h3>{`Order #${id}`}</h3>
            <div>
              <button onClick={this.props.handleOrderModal}>X</button>
            </div>
          </div>
        </header>
        <div className='main'>
          <div className='order-date-time'>
            <h3>{`Order Date: ${date}`}</h3>
            <h3>{`Order Time: ${time}`}</h3>
          </div>
          <div className='user-info'>
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <h3>{user.address}</h3>
            <h3>{`${user.city}, ${user.state} ${user.zipcode}`}</h3>
            <h3>{user.email}</h3>
            <h3>{user.phone_number}</h3>
          </div>
          <h2>Order Details</h2>
          <hr></hr>
          <div className='product-header'>
            <h4>Quantity</h4>
            <h4></h4>
            <h4>Item</h4>
            <h4>Size</h4>
            <h4>Price</h4>
          </div>
          {renderProducts}
          <hr></hr>
          <div className='total-price'>
            <h4>{`Total Price: ${this.totalPrice()}`}</h4>
          </div>
        </div>
      </div>
    );
  }
}

// const AdminShowOrder = () => {
//   return (
//   <div className='admin-show-order'></div>
//  )
// }

export default AdminShowOrder;
