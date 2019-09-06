import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';


class ConfirmDelete extends Component {

  // handleDelete = () => {
  //   console.log('delete')
  //   fetch(`http://localhost:3000/products/${this.props.userID}`, {
  //     method: "DELETE"
  //   })
  //   .then(parsedData => {
  //     this.props.updateQuantity(parsedData)
  //     this.props.handleDeleteClick()
  //   })
  // }

  render() {
    return (
      <div className="confirm-delete">
        <header>
          <FontAwesomeIcon size="5x" icon={faExclamationCircle} />
        </header>
        <div className="confirm-delete-main">
          <h3>Are you Sure?</h3>
          <p>You won't be able to revert this!</p>
        </div>
        <div className="confirm-delete-footer">
          <button onClick={this.props.deleteProduct} id="confirm-delete-btn">Yes, delete it!</button>
          <button onClick={this.props.handleDeleteClick} id="confirm-cancel-btn">Cancel</button>
        </div>

      </div>
    )
  }
}

export default ConfirmDelete

