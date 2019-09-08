import React, { Component } from 'react'
import AdminInfoBox from '../Components/admin-info-box/AdminInfoBox'
import AdminSingleOrder from '../Components/admin-single-order/AdminSingleOrder'

class OrderContainer extends Component {
  state = {
    orders: [],
    showOrder: {}
  }

  componentDidMount() {
    // Fetch all orders
    fetch('http://localhost:3000/orders', {
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(parsedData => {this.setState({
      orders: parsedData
    })})
  }

  // Fetchs order details and grabs user id from AdminSingleOrder 
  handleClick = (orderId) => {
    console.log(orderId)
    fetch(`http://localhost:3000/orders/${orderId}`, {
      headers: {
        Authorization: localStorage.token
      }
    })
    .then(resp => resp.json())
    .then(console.log)
  }

  render() {
    const renderOrders = this.state.orders.map(order => {
      return <AdminSingleOrder key={order.id} orderId={order.id} createdAt={order.created_at} handleClick={this.handleClick} />
    })
    const numberOfSales = this.state.orders.length
    console.log(numberOfSales)
    return (
      <div className="render-menu-container">
        <div className='admin-info-bar'>
          <AdminInfoBox title={"Total Sales"} info={numberOfSales} />
          <AdminInfoBox title={"Total Earnings"} price={`12212`} />
          <AdminInfoBox title={"Top Customer"} customer={'Sean'} />
        </div>
        <div className='admin-order-component'>
          {renderOrders}
        </div>
      </div>
    )
  }
}

export default OrderContainer
