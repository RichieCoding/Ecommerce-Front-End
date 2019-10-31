import React from 'react';
import './spinner.styles.scss';
import spinner from '../../assets/images/spinner.gif';

const Spinner = () => {
  return (
    <>
      <img src={spinner} alt="Loading..." className="spinner" />
    </>
  )
}

export default Spinner
