import { StripeCheckout } from "../components";
import React from "react";
import styled from "styled-components";
import { StoreContext } from "../context/context";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
// eslint-disable-next-lineclear
const Checkout = () => {
  const { cartItems } = React.useContext(StoreContext);

  return (
    <Wrapper>
      <main>
        {cartItems.length == 0 ? (
          <div className='empty-cart'>
            <h1>Cart is Empty</h1>
            <Link to={{ pathname: "/" }} className='empty-back-icon'>
              <BiArrowBack />
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
        <h1>checkout here</h1>
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.nav`.container-text-del {
    display: flex;
    flex-direction: row;
  }
  .item-delete{
        margin: 1.3rem;
    font-size: 2rem;
}
.item-delete:hover{
      color:#ecd7d7;
     cursor: pointer; 
}
  }
  .btn-checkout {
    position: relative !important;
    right: 2rem;
    font-size: 1rem !important;
    background: #ca6e6e;
  }
  .btn-checkout:hover {
    background: #da9c9c;
  }
  .checkout-container {
    height: 6rem;
    position: absolute !important;
    right: 0rem;
  }
  .title {
    position: relative;
    text-align: center;
    margin: 2rem;
    margin-top: 3rem;
    font-family: "Dancing Script", cursive;
  }
  .total-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem;
    background: #ae5c5c;
  }
  .total-container h1 {
    font-size: 2rem;
    margin: 2rem;
  }
  .item-container {
    display: flex;
    background: #ca6e6e;
    margin: 2rem;
    justify-content: space-between;
  }
  .item-text-container {
    display: flex;
    flex-direction: column;
  }
  .item-side {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .empty-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-content: center;

    height: 100vh;
  }
  .empty-back-icon {
    font-size: 2.5rem;
    margin: 1rem;
  }
  .back-icon {
    font-size: 3rem;
    margin-left: 1rem;
    position: absolute;
    top: 4rem;
    left: 1rem;
  }
  .empty-back-icon:hover {
    color: #ca6e6e;
  }
  .back-icon:hover {
    color: #ca6e6e;
  }
  .empty-cart h1 {
    font-family: "Dancing Script", cursive;
  }
  .item-img {
    width: 11rem;
    height: auto;
    margin: 3rem;
  }
  .item-total {
    margin: 2rem;
    font-weight: 600;
    font-size: 2rem;
  }
  .item-name {
    margin: 2rem;
  }
  .item-price {
    margin: 2rem;
    font-weight: 400;
    font-size: 1.5rem;
    margin-left: 4rem;
  }
  .item-amount {
    margin: 2rem;
    font-weight: 400;
    font-size: 1.5rem;
    margin-left: 4rem;
  }
  .total-side {
    display: flex;
    align-items: center;
  }`;
export default Checkout;
