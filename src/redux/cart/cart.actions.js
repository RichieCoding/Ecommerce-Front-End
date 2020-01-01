import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});

export const fetchCartItems = items => ({
  type: CartActionTypes.FETCH_CART_ITEMS,
  payload: items
})

export const addToCart = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});
