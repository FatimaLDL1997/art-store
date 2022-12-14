import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { StoreContext } from "../context/context";
import { TiThMenu } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";
import { TiArrowBack } from "react-icons/ti";

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
    clicked,
    setClicked,
    changeIcon,
    setChangeIcon,
    setLoginAsGuest,
    loginAsGuest,
  } = React.useContext(StoreContext);

  const categories = ["all", ...new Set(products.map((item) => item.category))];
  const isUser = isAuthenticated && user;
  const handleBrgrMenu = () => {
    let menu = document.getElementsByClassName("hamburger-menu");
    let main = document.getElementsByClassName("main");
    // console.log(main.length);
    if (clicked) {
      console.log("clicked");
      if (main.length > 0) {
        main[0].style.position = "relative";
        main[0].style.overflow = "hidden";
      }
      setChangeIcon(false);

      menu[0].style.display = "block";
    } else {
      if (main.length > 0) {
        main[0].style.position = "absolute";
        main[0].style.overflow = "visible";
      }
      setChangeIcon(false);

      console.log("not Clicked");
      menu[0].style.display = "none";
    }
  };

  const handleBack = () => {
    setChangeIcon(true);
    setClicked(false);
    console.log("back______________");
    console.log("changeIcon: " + changeIcon);
    console.log("clicked: " + clicked);
  };

  useEffect(() => {
    handleBrgrMenu();
    console.log("burger____________");
    console.log("changeIcon: " + changeIcon);
    console.log("clicked: " + clicked);
  }, [clicked]);

  useEffect(() => {
    let onSingleProductPage =
      document.getElementsByClassName("adj-amount").length;
    if (onSingleProductPage == 1) {
      setChangeIcon(true);
      // console.log(onSingleProductPage);
    } else {
      setChangeIcon(false);
    }
  });

  return (
    <Wrapper>
      <div className='all-nav'>
        <Link to={`/`}>
          {!changeIcon &&
            !clicked && ( // on the main page
              <TiThMenu
                className='burger-icon'
                onClick={() => {
                  setClicked(!clicked);
                }}
              />
            )}
          {!changeIcon && clicked && (
            <GiCrossMark
              className='burger-icon'
              onClick={() => {
                setClicked(!clicked);
              }}
            />
          )}
          {changeIcon && ( // on the single product page
            <TiArrowBack className='burger-icon' onClick={() => handleBack()} />
          )}
        </Link>

        <div className='top-nav'>
          {isUser && user.picture && <img src={user.picture} alt={user.name} />}
          {isUser && user.name && (
            <h4>welcome, {user.nickname.toUpperCase()}</h4>
          )}
          {!isUser ? (
            <button onClick={loginWithRedirect}>Hello Guest! Login?</button>
          ) : (
            <button
              onClick={() => {
                clearCart();
                setLoginAsGuest(false);
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
              {/* {console.log(cartItems.length)} */}
              <h1 className='cart-amount'>
                {!cartItems ? 0 : cartItems.length}
              </h1>
            </div>
          </Link>
        </div>
        <div className='hamburger-menu'>
          <h4>CATEGORIES</h4>
          {categories.map((item, index) => {
            return (
              <h5
                key={index}
                className={
                  active === index ? "category-btn" : "category-btn-white"
                }
                onClick={() => filterItems(item, index)}
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

  .category-btn-white {
    color: white;
    padding-bottom: 1rem;
  }
  .category-btn-white:hover {
    cursor: pointer;
    color: #1a0b0b;
  }
  .category-btn:hover {
    cursor: pointer;
  }
  .category-btn {
    padding-bottom: 1rem;
  }
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
    align-items: center;
  }
  .logout-icon {
    color: #5d8061;
    font-size: 3vw;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    position: relative;
    z-index: 4 !important;
  }
  @media screen and (max-width: 800px) {
    .logout-icon {
      font-size: 1.5rem;
    }
    .top-nav img {
      height: 7vw;
      width: 7vw !important;
    }
  }
`;

export default Navbar;
