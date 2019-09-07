import React, { Component } from 'react'
import AdminInfoBox from '../Components/admin-info-box/AdminInfoBox'
import AdminSingleOrder from '../Components/admin-single-order/AdminSingleOrder'

class OrderContainer extends Component {
  state = {
    orders: []
  }

  componentDidMount() {
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

  render() {
    const renderOrders = this.state.orders.map(order => {
      return <AdminSingleOrder key={order.id} orderId={order.id} createdAt={order.created_at} />
    })
    const numberOfSales = this.state.orders.length
    console.log(numberOfSales)
    return (
      <div className="render-menu-container">
        <div className='admin-info-bar'>
          <AdminInfoBox title={"Total Sales"} info={numberOfSales} />
          <AdminInfoBox title={"Total Earnings"} />
          <AdminInfoBox title={"Top Customer"} />
        </div>
        <div className='admin-order-component'>
          {renderOrders}
        </div>
      </div>
    )
  }
}

export default OrderContainer
