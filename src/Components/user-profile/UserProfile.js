import React from "react";
import "./user-profile.styles.scss";
import CustomerProfileForm from "../customer-profile-form/CustomerProfileForm";
import CustomerSingleOrderPreview from "../customer-single-order-preview/CustomerSingleOrderPreview";
import Header from "../header/Header";

const UserProfile = props => {
  const { first_name, username } = props.userInfo;
  // const sorted = props.usersOrders.sort(function(a,b){
  //   return b.name.localeCompare(a.name)})
  const renderOrders =
    props.usersOrders !== undefined
      ? props.usersOrders.map((order, index) => {
          return (
            <CustomerSingleOrderPreview
              key={order.id}
              orderNumber={index}
              userId={order.user_id}
              orderId={order.id}
            />
          );
        })
      : null;
  // const renderOrders = orders.map()
  return (
    <>
      {/* <Header cart={props.cart} /> */}
      <div className='user-profile'>
        <div className='user-container'>
          <header className='welcome'>
            <h2>
              {first_name !== null
                ? `Welcome ${first_name}`
                : `Welcome ${username}`}
            </h2>
          </header>
          <main>
            {/* All Order Details */}
            <div className='order-details'>
              <div className='all-order-title'>
                <h2>All Orders</h2>
              </div>
              <div>{renderOrders}</div>
            </div>
            {/* All User Info */}
            <div className='all-user-info'>
              <div className='edit-title'>
                <h2>Your Profile</h2>
              </div>

              <CustomerProfileForm
                currentUser={props.currentUser}
                usersOrders={props.usersOrders}
                userInfo={props.userInfo}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
