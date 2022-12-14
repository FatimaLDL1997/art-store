import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { hobbies } from "../context/data/products";

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  //auth0
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  //others
  const [products, setProducts] = useState(hobbies);
  const [active, setActive] = useState("0");
  const [isloading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [menuItems, setMenuItems] = useState(products);

  //menu and back icon toggle variables
  const [clicked, setClicked] = useState(false);
  const [changeIcon, setChangeIcon] = useState(false);

  //form for shipping details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");

  //error
  const [error, setError] = useState({ show: false, msg: "" });

  //guest login
  const [loginAsGuest, setLoginAsGuest] = useState(false);

  const filterItems = (item, index) => {
    if (item === "all") {
      setMenuItems(products);
      // console.log(menuItems);
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
    // console.log(items);
    if (items) {
      setTotal((prevTotal) => {
        // console.log("store total");
        prevTotal = items.reduce(
          (a, v) => (a = a + parseInt(v[0].price) * parseInt(v[0].amount)),
          0
        );
        // console.log(prevTotal);
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
        changeIcon,
        setChangeIcon,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phone,
        setPhone,
        country,
        setCountry,
        state,
        setState,
        postalCode,
        setPostalCode,
        line1,
        setLine1,
        line2,
        setLine2,
        city,
        setCity,
        loginAsGuest,
        setLoginAsGuest,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export { StoreProvider, StoreContext };
