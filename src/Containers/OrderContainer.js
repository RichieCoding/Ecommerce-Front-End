import React, { Component } from "react";
import AdminInfoBox from "../Components/admin-info-box/AdminInfoBox";
import AdminSingleOrder from "../Components/admin-single-order/AdminSingleOrder";
import AdminShowOrder from "../Components/admin-show-order/AdminShowOrder";
import URL from '../Components/URL'

class OrderContainer extends Component {
  state = {
    orders: [],
    modalClicked: false,
    totalEarning: 0,
    topCustomer: "None"
  };

  componentDidMount() {
    // Fetch all orders
    fetch(`${URL}/orders`, {
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
    this.fetchTotalEarnings();
    this.fetchTopCustomer();
  }

  // Grabs total earnings for all Sales
  fetchTotalEarnings = () => {
    fetch(`${URL}/order_products`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(data => {
        // If 0 zero orders were placed than set earnings to 0
        if (data.length !== 0) {
          let totalEarningArr = data.map(order => order.product.price);
          let totalEarning = totalEarningArr.reduce(
            (sum, item) => (sum += item)
          );
          this.setState({
            totalEarning
          });
        } else {
          this.setState({
            totalEarning: "0"
          });
        }
      });
  };

  // Figures out the customer with the most orders placed.
  fetchTopCustomer = () => {
    fetch(`${URL}/orders`, {
      headers: {
        Authorization: localStorage.token
      }
    })
      .then(resp => resp.json())
      .then(parsedOrders => {
        if (parsedOrders.length !== 0) {
          // Set empty object
          const customers = {};
          // Loop through all orders from data
          parsedOrders.map(order => {
            // If the customer is not in object than make a key with their id and set value to 1
            // If the customer is there than just add one to the current value
            if (!customers[order.user.id]) {
              customers[order.user.id] = 1;
            } else {
              customers[order.user.id] += 1;
            }
          });
          // Looping all the values and comparing them and returning the highest value
          const topCustomer = Object.keys(customers).reduce((a, b) =>
            customers[a] > customers[b] ? a : b
          );
          // Make a fetch with the users id
          fetch(`${URL}/users/${topCustomer}`, {
            headers: {
              Authorization: localStorage.token
            }
          })
          .then(resp => resp.json())
          .then(data => {
            this.setState({
              topCustomer: data.first_name
            });
          })  
        }
      });
  };

  // Fetchs order details and grabs user id from AdminSingleOrder
  handleClick = orderId => {
    fetch(`${URL}/orders/${orderId}`, {
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
    return (
      <div className='render-menu-container'>
        <div className='admin-info-bar'>
          <AdminInfoBox
            title={"Total Sales"}
            info={!numberOfSales ? "0" : numberOfSales}
          />
          <AdminInfoBox
            title={"Total Earnings"}
            price={this.state.totalEarning}
          />
          <AdminInfoBox
            title={"Top Customer"}
            customer={this.state.topCustomer}
          />
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
