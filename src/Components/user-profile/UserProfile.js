import React from "react";
import "./user-profile.styles.scss";
import CustomerProfileForm from "../customer-profile-form/CustomerProfileForm";
import CustomerSingleOrderPreview from "../customer-single-order-preview/CustomerSingleOrderPreview";
import Header from '../header/Header'

const UserProfile = props => {
  const { first_name } = props.userInfo;
  const renderOrders = props.usersOrders.map((order, index) => {
    return (
      <CustomerSingleOrderPreview
        key={order.id}
        orderNumber={index}
        userId={order.user_id}
        orderId={order.id}
      />
    );
  });
  // const renderOrders = orders.map()
  return (
    <>
      <Header />
    <div className='user-profile'>
      <div className='user-container'>
        <header className="welcome">
          <h2>{`Welcome ${first_name}`}</h2>
        </header>
        <main>
          {/* All Order Details */}
          <div className='order-details'>
            <div className='all-order-title'>
              <h3>All Orders</h3>
            </div>
            <div>
              {renderOrders}
            </div>
          </div>
          {/* All User Info */}
          <div className='all-user-info'>
            <div className='edit-title'>
              <h2>Your Profile</h2>
            </div>

            <CustomerProfileForm usersOrders={props.usersOrders} userInfo={props.userInfo}/>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default UserProfile;
