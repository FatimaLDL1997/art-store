import React, { useState, useEffect } from "react";

import axios from "axios"; // to perform json fetching requests

const StoreContext = React.createContext();

//provder , consumer  - GithubContext.Provider
// const getLocalStorage = () => {
//   let cartItems = localStorage.getItem("cartItems");
//   if (cartItems) {
//     return JSON.parse(localStorage.getItem("cartItems"));
//   } else {
//     return [];
//   }
// };
// console.log(getLocalStorage());

const StoreProvider = ({ children }) => {
  //request loading
  const [isloading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  //error
  const [error, setError] = useState({ show: false, msg: "" });

  return (
    <StoreContext.Provider
      value={{
        error,
        isloading,
        amount,
        setAmount,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export { StoreProvider, StoreContext };
