import React, { Component } from "react";
import "./customer-single-order-preview.styles.scss";
import AdminShowOrder from "../admin-show-order/AdminShowOrder";
import URL from '../URL'

class CustomerSingleOrderPreview extends Component {
  state = {
    clicked: false,
    currentOrderDetails: []
  };

  handleClick = () => {
    console.log(this.props.orderId);
    fetch(`${URL}/orders/${this.props.orderId}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(orderDetails =>
        this.setState({
          currentOrderDetails: orderDetails,
          clicked: !this.state.clicked
        })
      );
  };

  handleOrderModal = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    const { orderNumber } = this.props;
    return (
      <>
        <div className='customer-single-order-preview'>
          <h3>{`Order #${orderNumber + 1}`}</h3>
          <button onClick={this.handleClick}>View</button>
        </div>
        {this.state.clicked ? (
          <AdminShowOrder
            customer={true}
            orderDetails={this.state.currentOrderDetails}
            handleOrderModal={this.handleOrderModal}
          />
        ) : null}
      </>
    );
  }
}

export default CustomerSingleOrderPreview;
