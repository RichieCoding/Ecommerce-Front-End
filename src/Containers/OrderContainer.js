import React, { Component } from "react";
import AdminInfoBox from "../Components/admin-info-box/AdminInfoBox";
import AdminSingleOrder from "../Components/admin-single-order/AdminSingleOrder";
import AdminShowOrder from "../Components/admin-show-order/AdminShowOrder";

class OrderContainer extends Component {
  state = {
    orders: [],
    modalClicked: false,
    totalEarning: 0
  };

  componentDidMount() {
    // Fetch all orders
    fetch("http://localhost:3000/orders", {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedData => {
        this.setState({
          orders: parsedData
        });
      });
      this.fetchTotalEarnings()
  }

  fetchTotalEarnings = () => {
    fetch('http://localhost:3000/order_products', {
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(data => {
      let totalEarningArr = data.map(order => order.product.price);
      let totalEarning = totalEarningArr.reduce((sum, item) => sum += item)
      this.setState({
        totalEarning
      })
    })
  }

  // Fetchs order details and grabs user id from AdminSingleOrder
  handleClick = orderId => {
    console.log(orderId);
    fetch(`http://localhost:3000/orders/${orderId}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedData =>
        this.setState({
          showOrder: parsedData,
          modalClicked: !this.state.modalClicked
        })
      );
  };

  handleOrderModal = () => {
    this.setState({
      modalClicked: !this.state.modalClicked
    });
  };

  render() {
    const renderOrders = this.state.orders.map(order => {
      return (
        <AdminSingleOrder
          key={order.id}
          orderId={order.id}
          createdAt={order.date}
          time={order.time}
          handleClick={this.handleClick}
        />
      );
    });
    const numberOfSales = this.state.orders.length;
    console.log(numberOfSales);
    return (
      <div className='render-menu-container'>
        <div className='admin-info-bar'>
          <AdminInfoBox title={"Total Sales"} info={numberOfSales} />
          <AdminInfoBox title={"Total Earnings"} price={this.state.totalEarning} />
          <AdminInfoBox title={"Top Customer"} customer={"Sean"} />
        </div>
        <div className='admin-order-component'>{renderOrders}</div>
        {this.state.modalClicked ? (
          <AdminShowOrder
            handleOrderModal={this.handleOrderModal}
            orderDetails={this.state.showOrder}
          />
        ) : null}
      </div>
    );
  }
}

export default OrderContainer;
