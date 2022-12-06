import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { StoreContext } from "../context/context";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
  const {
    cartItems,
    clearCart,
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    products,
    setProducts,
    active,
    setActive,
    filterItems,
    menuItems,
    setMenuItems,
  } = React.useContext(StoreContext);
  const categories = ["all", ...new Set(products.map((item) => item.category))];
  const [clicked, setClicked] = useState(false);
  // console.log({ isAuthenticated, user, isLoading });
  const isUser = isAuthenticated && user;

  const handleBrgrMenu = () => {
    let menu = document.getElementsByClassName("hamburger-menu");
    console.log(menu[0].style);
    if (clicked) {
      console.log("clicked");
      menu[0].style.display = "block";
      console.log(menu[0].style.display);
    } else {
      console.log("not Clicked");
      menu[0].style.display = "none";
      console.log(menu[0].style.display);
    }
  };

  useEffect(() => {
    handleBrgrMenu();
  }, [clicked]);

  return (
    <Wrapper>
      <div className='all-nav'>
        <Link
          to={`/`}
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          <TiThMenu className='back-icon' />
        </Link>

        <div className='top-nav'>
          {isUser && user.picture && <img src={user.picture} alt={user.name} />}
          {isUser && user.name && (
            <h4>welcome, {user.nickname.toUpperCase()}</h4>
          )}
          {!isUser ? (
            <button onClick={loginWithRedirect}>Login</button>
          ) : (
            <button
              onClick={() => {
                clearCart();
                logout({ returnTo: window.location.origin });
              }}
            >
              <div className='logout-icon'>
                <RiLogoutCircleRLine />
              </div>
            </button>
          )}
          <Link to={`/cart`}>
            <HiShoppingCart className='cart-icon' />
            <div className='circle'>
              {console.log(cartItems.length)}
              <h1 className='cart-amount'>
                {!cartItems ? 0 : cartItems.length}
              </h1>
            </div>
          </Link>
        </div>
        <div className='hamburger-menu'>
          {categories.map((item, index) => {
            return (
              <h5
                key={index}
                className={
                  active === index ? "category-btn" : "category-btn-white"
                }
                onClick={
                  (() => filterItems(item, index), () => setClicked(false))
                }
              >
                {item}
              </h5>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding: 1rem;
  margin-bottom: 1rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  justify-items: center;
  position: static;
  left: 25vw;
  right: 75vw;

  h4 {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    font-size: 2vw;
    font-family: "Dancing Script", cursive;
  }
  img {
    width: 4vw !important;
    height: 4vw;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .all-nav {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .top-nav {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
  .logout-icon {
    color: #5d8061;
    font-size: 3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
  }
`;

export default Navbar;
