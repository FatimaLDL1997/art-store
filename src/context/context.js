import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { hobbies } from "../context/data/products";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  //request loading
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [products, setProducts] = useState(hobbies);
  const [active, setActive] = useState("0");
  const [isloading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState(products);
  const [clicked, setClicked] = useState(false);

  //error
  const [error, setError] = useState({ show: false, msg: "" });
  const filterItems = (item, index) => {
    if (item === "all") {
      setMenuItems(products);
      console.log(menuItems);
      setActive(index);
      setClicked(false);
      return;
    }

    const newItems = products.filter((product) => product.category === item);
    setMenuItems(newItems);
    setClicked(false);

    setActive(index);
  };
  function toggleError(show = false, msg = " ") {
    setError({ show, msg });
  }

  const clearCart = () => {
    setCartItems([]);
  };

  function calTotal(items) {
    console.log(items);
    if (items) {
      setTotal((prevTotal) => {
        console.log("store total");
        prevTotal = items.reduce(
          (a, v) => (a = a + parseInt(v[0].price) * parseInt(v[0].amount)),
          0
        );
        console.log(prevTotal);
        return prevTotal;
      });
    }
  }
  return (
    <StoreContext.Provider
      value={{
        products,
        setProducts,
        active,
        setActive,
        filterItems,
        isAuthenticated,
        loginWithRedirect,
        logout,
        user,
        error,
        setError,
        isloading,
        amount,
        setAmount,
        cartItems,
        setCartItems,
        clearCart,
        total,
        setTotal,
        calTotal,
        toggleError,
        menuItems,
        setMenuItems,
        clicked,
        setClicked,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export { StoreProvider, StoreContext };
