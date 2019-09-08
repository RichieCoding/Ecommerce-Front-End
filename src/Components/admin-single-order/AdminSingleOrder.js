import React from 'react';
import './admin-single-order.styles.scss';

const AdminSingleOrder = ({ orderId, createdAt, handleClick }) => (
  <div className="admin-single-order">
    <h3>{`Order # ${orderId}`}</h3>
    <h3>{createdAt}</h3>
    <button onClick={() => handleClick(orderId)}>View</button>
  </div>
)

export default AdminSingleOrder
