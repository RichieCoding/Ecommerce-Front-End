import React from "react";
import "./user-form-container.styles.scss";
import UserForms from '../../Components/UserForms'

const UserFormContainer = ({ title, handleClick, userInfo, userId, handleSubmit }) => (
  <div className='product-form-container'>
    <header>
      <h2>{title}</h2>
      <button onClick={handleClick} >X</button>
    </header>
    <UserForms userInfo={userInfo} handleSubmit={handleSubmit} userId={userId} />
  </div>
);

export default UserFormContainer;
