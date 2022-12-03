import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  //request loading
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const [isloading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  //error
  const [error, setError] = useState({ show: false, msg: "" });

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <StoreContext.Provider
      value={{
        isAuthenticated,
        loginWithRedirect,
        logout,
        user,
        error,
        isloading,
        amount,
        setAmount,
        cartItems,
        setCartItems,
        clearCart,
        total,
        setTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export { StoreProvider, StoreContext };
