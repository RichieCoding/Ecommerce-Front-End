import React, { Component } from "react";

class ProductForm extends Component {
  state = {
    name: "",
    color: "",
    size: "",
    quantity: "",
    price: "",
    varientId: "",
    imageUrl: "",
    description: ""
  };

  componentDidMount() {
    if (this.props.product !== undefined) {
      this.setState({
        ...this.props.product
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.product !== undefined) {
      fetch(`https://shoppie-final-backend.herokuapp.com/products/${this.props.product.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          ...this.state
        })
      })
        .then(resp => resp.json())
      .then(parsedData => {
        this.props.updateQuantity(parsedData)
      })
      this.props.handleAddClick()
    }
    else
      {
      fetch('https://shoppie-final-backend.herokuapp.com/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          ...this.state
        })
      })
      .then(resp => resp.json())
      .then(parsedData => {
        this.props.updateQuantity(parsedData)
      })
      this.props.handleAddClick()
      }
  };

  // updateQuantity={this.props.updateQuantity}
  // })
  //   .then(resp => resp.json())
  //   .then(this.props.history.push("/login"));
  // };

  render() {
    const {
      name,
      color,
      size,
      quantity,
      price,
      varientId,
      imageUrl,
      description
    } = this.state;
    return (
      <div className='product-form-wrapper'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='name'>Product Name:</label>
          <br></br>
          <input
            onChange={this.handleChange}
            value={name}
            type='text'
            id='name'
            name='name'
          />
          <br></br>
          <label htmlFor='color'>Color:</label>
          <br></br>
          <input
            onChange={this.handleChange}
            value={color}
            type='text'
            id='color'
            name='color'
          />
          <br></br>
          <label htmlFor='size'>Size:</label>
          <br></br>
          <input
            onChange={this.handleChange}
            value={size}
            type='text'
            id='size'
            name='size'
          />
          <br></br>
          <label htmlFor='quantity'>Quantity:</label>
          <br></br>
          <input
            onChange={this.handleChange}
            value={quantity}
            type='number'
            id='quantity'
            name='quantity'
          />
          <br></br>
          <label htmlFor='price'>Price:</label>
          <br></br>
          <input
            onChange={this.handleChange}
            value={price}
            type='text'
            id='price'
            name='price'
          />
          <br></br>
          <label htmlFor='varientId'>varientId:</label>
          <br></br>
          <input
            onChange={this.handleChange}
            value={varientId}
            type='text'
            id='varientId'
            name='varientId'
          />
          <br></br>
          <label htmlFor='image'>ImageURL:</label>
          <br></br>
          <input
            onChange={this.handleChange}
            value={imageUrl}
            type='text'
            id='image'
            name='imageUrl'
          />
          <br></br>
          <label htmlFor='description'>Description:</label>
          <br></br>
          <textarea
            onChange={this.handleChange}
            value={description}
            type='text'
            id='description'
            name='description'
          ></textarea>
          <br></br>
          <input id='product-form-submit-btn' type='submit' />
        </form>
      </div>
    );
  }
}

export default ProductForm;
