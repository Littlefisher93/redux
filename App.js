import React from "react";
// components
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
// items
import cartItems from "./cart-items";
// redux stuff

import { createStore } from "redux";

import reducer from "./reducer";

import { Provider } from "react-redux";
//initial store

//reducer separated file

const store = createStore(reducer); //vagy +initialstore

function App() {
  // cart setup

  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer cart={cartItems} />
    </Provider>
  );
}

export default App;
