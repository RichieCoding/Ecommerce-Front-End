import React from "react";
import "./admin-info-box.styles.scss";
import CountUp from 'react-countup'

const AdminInfoBox = ({ title, info, price, customer }) => (
  <div className='admin-info-box'>
    <header><h3 className="title">{title}</h3></header>
    {info ? <div className='info'><h2><CountUp end={info} /></h2></div> : null}
    {price ? <div className='price'><h2>$ <CountUp duration={1} end={price} /></h2></div> : null}
    {customer ? <div className='customer'><h2>{customer}</h2></div> : null}
  </div>
);

export default AdminInfoBox;
