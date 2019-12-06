import React, { useState, useEffect } from "react";
import "./single-product-page.styles.scss";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import URL from "../../Components/URL";

const SingleProductPage = ({ match, cart, cartId, handleCartFetch }) => {
  const [product, setProduct] = useState({});
  const [sizeLetter, setSizeLetter] = useState("");
  const [status, setStatus] = useState("Add to cart");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const productId = match.params.id;

    fetch(`${URL}/products/${productId}`)
      .then(res => res.json())
      .then(parsedProduct => {
        setProduct(parsedProduct);
        setSizeLetter(parsedProduct.size.charAt(0));
        setLoading(false);
        const { quantity } = parsedProduct;

        defineStatus(quantity);
      });
  }, []);

  // Defines what the status of product dependent on quantity
  const defineStatus = (quantity) => {
    if (quantity === 0) {
      setStatus("SOLD OUT");
    } else if (cart.length !== 0) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].product_id === product.id) {
          setStatus("Added");
        }
      }
    }
  }

  const addToCart = () => {
    const findProduct = cart.find(cartItem => {
      return cartItem.product_id === product.id;
    });
    if (!findProduct) {
      fetch(`${URL}/cart_items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: localStorage.token
        },
        body: JSON.stringify({
          cart_id: cartId,
          product_id: product.id
        })
      })
        .then(resp => resp.json())
        .then(res => {
          setStatus("Added");
          handleCartFetch();
        });
    }
  };

  const { name, color, imageUrl, price, description, size } = product;
  if (loading) return <Spinner />;
  return (
    <>
      <div className='back-btn-container'>
        <Link to='/shop'>
          <p className='back-btn'>Back to products</p>
        </Link>
      </div>

      <div className='single-product-page'>
        <div className='product-container'>
          <h3 className='product-name'>{name}</h3>
          <h3 className='product-price'>{`$${price}.00`}</h3>
        </div>

        <div className='product-image'>
          <img src={imageUrl} alt='product' />
        </div>

        <div className='color-wrapper'>
          <div className='color-container'>
            <div
              className='product-color'
              style={{ background: `${color}` }}
            ></div>
          </div>
          <p className='color-text'>{color}</p>
          <hr />
        </div>

        <div className='size-wrapper'>
          <p className='size-text'>{size}</p>
          <div className='product-size'>
            <div className='size-container'>
              <p className='size-letter'>{sizeLetter}</p>
            </div>
          </div>
        </div>

        <div className='add-to-cart-btn'>
          {status === "SOLD OUT" ? (
            <button className='add-to-cart'>{status}</button>
          ) : (
            <button onClick={addToCart} className='add-to-cart'>
              {status}
            </button>
          )}
        </div>

        <div className='product-description'>
          <p className='detail-title'>Details</p>
          <p className='detail-description'>{description}</p>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
