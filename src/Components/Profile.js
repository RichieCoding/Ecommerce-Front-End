import React from "react";

function Profile(props) {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    address,
    city,
    state,
    zipcode,
    username,
    admin
  } = props.userInfo;
  
  return (
    <div>
      <h1>Profile Page you're {`${first_name} ${last_name}`}</h1>
      <h3>Email: {email}</h3>
      <h3>Phone Number: {phone_number}</h3>
      <h3>Username: {username}</h3>
      <h3>Address: {address}</h3>
      <h3>City: {city}</h3>
      <h3>State: {state}</h3>
      <h3>ZipCode: {zipcode}</h3>

    </div>
  );
}

export default Profile;
