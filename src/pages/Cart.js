import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { StoreProvider, StoreContext } from "../context/context";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import CheckoutNavbar from "../components/CheckoutNavbar";

// eslint-disable-next-line

const Cart = () => {
  const {
    amount,
    setAmount,
    cartItems,
    total,
    setTotal,
    setCartItems,
    isloading,
    calTotal,
    setClicked,
    setDotNum,
  } = React.useContext(StoreContext);

  setTimeout(() => {
    setDotNum("1");
  }, [0]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleDel = (e) => {
    let clickedItem =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .children[0].alt;

    let foundIndex = cartItems.findIndex((el) => el[0].name == clickedItem);

    setCartItems((prevItems) => {
      prevItems.splice(foundIndex, 1);
      // console.log(cartItems);
      calTotal(cartItems); //pass the updated cartitems after deletion

      // console.log(total);
      return prevItems;
    });
    forceUpdate();
  };

  return (
    <Wrapper>
      <CheckoutNavbar />

      <main>
        {cartItems.length == 0 ? (
          <div className='empty-cart'>
            <h1>Cart is Empty</h1>
            <Link to={{ pathname: "/" }} className='empty-back-icon'>
              <BiArrowBack />
            </Link>
          </div>
        ) : (
          <div>
            <h1 className='title'>CartItems</h1>
            {/* <Link to={{ pathname: "/" }} className='back-icon'>
              <BiArrowBack />
            </Link> */}
            {cartItems.map((item, index) => {
              const { amount, price, id, name, src } = item[0];
              // const { amount, price, id, name, src } = item;
              return (
                <div key={index} className='item-container'>
                  <div className='item-side'>
                    <img className='item-img' src={src} alt={name} />
                    <div className='item-text-container'>
                      <div className='container-text-del'>
                        <h3 className='item-name'>{name}</h3>
                        <div className='item-delete'>
                          <AiTwotoneDelete onClick={(e) => handleDel(e)} />
                        </div>
                      </div>
                      <h4 className='item-price'>
                        Price: ${price} x {amount}
                      </h4>
                    </div>
                  </div>
                  <div className='total-side'>
                    <h1 className='item-total'>
                      ${parseInt(amount) * parseInt(price)}
                    </h1>
                  </div>
                </div>
              );
            })}

            <div className='total-container'>
              <h1>Total</h1>
              <h1>${total}</h1>
            </div>
            <div className='btn-container'>
              <Link to={{ pathname: "/" }}>
                <button className='btn back-checkout'>BACK</button>
              </Link>
              <Link to={{ pathname: "/form" }}>
                <button className='btn btn-checkout'>CHECKOUT</button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.nav`
.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10rem;
  margin-top: 2rem;
}
  .container-text-del {
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
  .back-checkout {
    position: relative !important;
    // right: 10rem;
    font-size: 1rem !important;
    background: #ca6e6e;
  }
  .back-checkout:hover {
    background: #da9c9c;
  }
  .btn-checkout {
    position: relative !important;
    // right: 10rem;
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
    font-size:3rem;
  }
  .total-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10rem;
    background: #ae5c5c;
    margin-top: 2rem;
    margin-bottom: 2rem ; 

  }
  .total-container h1 {
    font-size: 2rem;
    margin: 2rem;
  }
  .item-container {
    display: flex;
    background: #ca6e6e;
    margin: 10rem;
    justify-content: space-between;
    margin-bottom: 2rem;
    margin-top: 2rem;


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
    font-size: 2rem;
    margin: 1rem;
    color: black;
  }
  .back-icon {
    font-size: 2rem;
    margin-left: 1rem;
    position: absolute;
    top: 6rem;
    left: 1rem;
    color: black;
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
  }
@media screen and (max-width: 800px) {
  .container-text-del {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-name {
    margin-bottom: -1rem; 
  }
  .btn-checkout {
    right: 2rem !important;
  }
  .title {
    font-size:3rem;
  }
  .item-container {
    margin: 2rem !important;
    flex-direction: column; 
  }
  .total-side {
    justify-content: center ; 
  }
  .total-container {
    margin: 2rem !important;
  }
  .item-img  {
    margin: 3rem !important; 
    width:10rem !important;
    margin-bottom: 0rem !important;
  }
  .item-text-container {
    align-items: center; 
  }
  .item-side {
    justify-content: center; 
  }
  .item-price {
    padding-bottom: 2rem; 
    margin: 0; 
  }
  .total-container h1 {
    font-size: 1.5rem !important; 
  }
  .item-delete {
    display: flex;
    align-items: center;
  }
}
`;
export default Cart;
