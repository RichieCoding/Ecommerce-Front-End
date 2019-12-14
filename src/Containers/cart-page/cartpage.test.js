import React from 'react';
import CartPage from './CartPage';

test('should total up cart items in array', () => {
  const arrayOfProducts = [
    { id: 1, products: { price: 5 } },
    { id: 1, products: { price: 15 } },
    { id: 1, products: { price: 25 } }
  ];
  expect(CartPage.cartTotal(arrayOfProducts)).toBe(45);
});
