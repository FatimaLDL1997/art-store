import React, { useState } from "react";

const StoreContext = React.createContext();

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
