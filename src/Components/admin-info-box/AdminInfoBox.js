import React from "react";
import "./admin-info-box.styles.scss";

const AdminInfoBox = ({ title, info }) => (
  <div className='admin-info-box'>
    <header><h3 className="title">{title}</h3></header>
    {info ? <div><h2>{info}</h2></div> : null}
  </div>
);

export default AdminInfoBox;
