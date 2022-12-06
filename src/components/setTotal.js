import React from "react";
import { StoreProvider, StoreContext } from "../context/context";

export const setTotal = () => {
  const { amount, setAmount, cartItems, total, setTotal, setCartItems } =
    React.useContext(StoreContext);

  return setTotal((prevTotal) => {
    console.log("store total");
    prevTotal = cartItems.reduce(
      (a, v) => (a = a + parseInt(v[0].price) * parseInt(v[0].amount)),
      0
    );
    return prevTotal;
  });
};

export default setTotal;
