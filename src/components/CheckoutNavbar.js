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
            <AiOutlineShoppingCart
              className='icon1'
              style={{
                fontSize: "2rem",
                color: dotNum == 1 ? "black" : "white",
              }}
            />
          </Link>
          <Link to={{ pathname: "/form" }}>
            <FaWpforms
              className='icon2'
              style={{
                fontSize: "2rem",
                color: dotNum == 2 ? "black" : "white",
              }}
            />
          </Link>
          <Link to={{ pathname: "/checkout" }}>
            <RiMoneyDollarBoxLine
              className='icon3'
              style={{
                fontSize: "2rem",
                color: dotNum == 3 ? "black" : "white",
              }}
            />
          </Link>
          <Link to={{ pathname: "/checkout" }}>
            <IoMdCheckboxOutline
              className='icon4'
              style={{
                fontSize: "2rem",
                color: dotNum == 4 ? "black" : "white",
              }}
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
    width: 100%;
    height: 5rem;
    padding: 4rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .text-container {
    width: 100%;
    height: 4rem;
    display: flex;
    padding-top: 0.5rem;
    align-items: center;
    justify-content: space-around;
  }

  .line-container {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line-container img {
    width: 90%;
    height: auto;
    padding: 0.5rem;
  }
  .text {
    font-size: 1.5rem;
    font-weight: 200;
    font-family: "Dancing Script", cursive;
    color: white;
  }
  // .icon:hover {
  //   color: red;
  // }
  // .icon:active {
  //   color: red;
  // }
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
      padding-bottom: 2rem;
    }
    .container {
      padding: 2rem;
    }
  }
`;
