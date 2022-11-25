import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "../components";
import styled from "styled-components";
import loadingImage from "../images/preloader.gif";
import { HiShoppingCart } from "react-icons/hi";
import { hobbies } from "../context/data/products";
import { StoreProvider, StoreContext } from "../context/context";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

const Cart = () => {
  const { amount, setAmount, cartItems, setCartItems, isloading } =
    React.useContext(StoreContext);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleDel = (e) => {
    let clickedItem =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .children[0].alt;
    console.log(
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .children[0].alt
    );
    let foundIndex = cartItems.findIndex((el) => el[0].name == clickedItem);
    console.log(foundIndex);
    setCartItems((prevItems) => {
      prevItems.splice(foundIndex, 1);
      return prevItems;
    });
    forceUpdate();
  };

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
          <div>
            <h1 className='title'>CartItems</h1>
            <Link to={{ pathname: "/" }} className='back-icon'>
              <BiArrowBack />
            </Link>
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
              <h1>
                $
                {cartItems.reduce(
                  (a, v) =>
                    (a = a + parseInt(v[0].price) * parseInt(v[0].amount)),
                  0
                )}
              </h1>
            </div>
            <Link to={{ pathname: "/checkout" }} className='checkout-container'>
              <button
                onClick={(e) => console.log("checkout")}
                className='btn btn-checkout'
              >
                CHECKOUT
              </button>
            </Link>
          </div>
        )}
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.nav`
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
  }
`;
export default Cart;
