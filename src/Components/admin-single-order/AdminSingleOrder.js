import React from 'react';
import './admin-single-order.styles.scss';

const AdminSingleOrder = ({ orderId, createdAt, handleClick }) => (
  <div className="admin-single-order">
    <div className='order-date'>
      <h3>{createdAt}</h3>
    </div>
    <h3>{`Order # ${orderId}`}</h3>
    <button onClick={() => handleClick(orderId)}>View</button>
  </div>
)

export default AdminSingleOrder
