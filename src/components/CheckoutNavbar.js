import React from "react";
import styled from "styled-components";
import dot1 from "../images/dot1.png";
import dot2 from "../images/dot2.png";
import dot3 from "../images/dot3.png";
import dot4 from "../images/dot4.png";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/context";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaWpforms } from "react-icons/fa";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { IoMdCheckboxOutline } from "react-icons/io";

const CheckoutNavbar = () => {
  const { dotNum } = React.useContext(StoreContext);
  console.log(dotNum);
  return (
    <Wrapper>
      <div className='container'>
        <div className='text-container'>
          <Link to={{ pathname: "/cart" }}>
            <AiOutlineShoppingCart className='text' />
          </Link>
          <Link to={{ pathname: "/form" }}>
            <FaWpforms className='text' />
          </Link>
          <Link to={{ pathname: "/checkout" }}>
            <RiMoneyDollarBoxLine
              style={{ fontSize: "1.5rem", color: "white" }}
            />
          </Link>
          <Link to={{ pathname: "/checkout" }}>
            <IoMdCheckboxOutline
              style={{ fontSize: "1.5rem", color: "white" }}
            />
          </Link>
        </div>

        {dotNum === "1" && (
          <div className='line-container'>
            <img src={dot1} />
          </div>
        )}
        {dotNum === "2" && (
          <div className='line-container'>
            <img src={dot2} />
          </div>
        )}
        {dotNum === "3" && (
          <div className='line-container'>
            <img src={dot3} />
          </div>
        )}
        {dotNum === "4" && (
          <div className='line-container'>
            <img src={dot4} />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default CheckoutNavbar;
const Wrapper = styled.div`
  .checkout-nav {
    color: black;
  }
  .checkout-nav:hover {
    color: #5d9988;
  }
  .container {
    background: #ca6e6e;
    width: 100vw;
    height: 5rem;
    padding: 4rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .text-container {
    width: 100vw;
    height: 4rem;
    display: flex;
    padding-top: 0.5rem;
    align-items: center;
    justify-content: space-around;
  }
  .text {
    color: white;
  }
  .line-container {
    width: 100vw;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line-container img {
    width: 90vw;
    height: auto;
    padding: 0.5rem;
  }
  .text {
    font-size: 1.5rem;
    font-weight: 200;
    font-family: "Dancing Script", cursive;
  }
  @media screen and (max-width: 800px) {
    .text {
      font-size: 0.8rem;
      font-weight: 200;
      font-family: "Dancing Script", cursive;
    }
    .line-container {
      height: 0rem;
    }
    .text-container {
      height: 2rem;
      padding: 0;
    }
    .container {
      padding: 2rem;
    }
  }
`;
