import React, { Component } from "react";
import "./settings-container.styles.scss";

const SettingsContainer = ({handleDarkMode}) => {
  return (
    <div className='inventory-container'>
      <div className='dark-mode'>
        <label name='dark'>Dark Mode</label>
        <input
          onChange={handleDarkMode}
          type='checkbox'
          name='dark'
          id='dark'
        />
      </div>
    </div>
  );
};

export default SettingsContainer;
