import CartActionTypes from './cart.types'

const initialState = {
  cartId: null,
  hidden: true,
  cartItems: []
}

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return !state.hidden
    case CartActionTypes.FETCH_CART_ITEMS:
      return {
        ...state,
        cartItems: [...state.cartItems, ...action.payload]
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    default:
      return state
  }
}

export default cartReducer;