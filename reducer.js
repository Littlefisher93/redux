import { act } from "react-dom/test-utils";
import {
  DECREASE,
  INCREASE,
  CLEAR_CART,
  REMOVE,
  GET_TOTAL,
  TOGGLE_AMOUNT,
} from "./actions";
import cartItems from "./cart-items";

const initialStore = {
  /*  count: 0,
  name: "john",*/
  cart: cartItems,
  total: 100,
  amount: 10,
};

function reducer(state = initialStore, action) {
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === DECREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount - 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }
  if (action.type === INCREASE) {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload.id) {
        cartItem = { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
    };
  }
  if (action.type === GET_TOTAL) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === TOGGLE_AMOUNT) {
    return {
      ...state,
      cart: state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.toggle === "inc") {
            return (cartItem = { ...cartItem, amount: cartItem.amount + 1 });
          }
          if (action.payload.toggle === "dec") {
            return (cartItem = { ...cartItem, amount: cartItem.amount - 1 });
          }
        }
        return cartItem;
      }),
    };
  }
  return state; //new state
}

/* switch(action.type){
  case CLEAR_CART:
   return{...state,cart:[]};
   default:
    return state;
 } */
export default reducer;
