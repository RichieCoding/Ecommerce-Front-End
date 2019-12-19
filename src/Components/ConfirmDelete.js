import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const ConfirmDelete = props => {
  return (
    <div className='confirm-delete'>
      <header>
        <FontAwesomeIcon size='5x' icon={faExclamationCircle} />
      </header>
      <div className='confirm-delete-main'>
        <h3>Are you Sure?</h3>
        <p>You won't be able to revert this!</p>
      </div>
      <div className='confirm-delete-footer'>
        <button onClick={props.deleteProduct} id='confirm-delete-btn'>
          Yes, delete it!
        </button>
        <button onClick={props.handleDeleteClick} id='confirm-cancel-btn'>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
