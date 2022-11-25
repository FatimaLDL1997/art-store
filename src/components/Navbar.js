import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { StoreProvider, StoreContext } from "../context/context";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  const { amount, setAmount, cartItems, setCartItems, isloading } =
    React.useContext(StoreContext);
  // console.log({ isAuthenticated, user, isLoading });
  const isUser = isAuthenticated && user;
  return (
    <Wrapper>
      {isUser && user.picture && <img src={user.picture} alt={user.name} />}
      {isUser && user.name && <h4>welcome, {user.nickname.toUpperCase()}</h4>}
      {!isUser ? (
        <button onClick={loginWithRedirect}>Login</button>
      ) : (
        <button
          onClick={() => {
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
          <h1 className='cart-amount'>{!cartItems ? 0 : cartItems.length}</h1>
        </div>
      </Link>
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
