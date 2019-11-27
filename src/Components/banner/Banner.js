import React from "react";
import "./banner.styles.scss";
import { Link } from "react-router-dom";

export const Banner = props => {
  return (
    <div className='banner'>
      <h2 className='title'>{props.title}</h2>
      {props.button ? (
        <div className='shop-btn'>
          <Link to='/shop' className='shop-link'>
            {props.button}
          </Link>
        </div>
      ) : null}
    </div>
  );
};
