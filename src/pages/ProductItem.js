import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navbar } from "../components";
import { HiShoppingCart } from "react-icons/hi";
import { hobbies } from "../context/data/products";
import { Link } from "react-router-dom";
import { BiArrowBack, BiMinus, BiPlus } from "react-icons/bi";
import { StoreProvider, StoreContext } from "../context/context";

const ProductItem = () => {
  // console.log("product");
  const { productId } = useParams();
  const {
    amount,
    setAmount,
    cartItems,
    total,
    setTheTotal,
    calTotal,
    setCartItems,
    error,
    toggleError,
    clicked,
    setClicked,
    changeIcon,
    setchangeIcon,
  } = React.useContext(StoreContext);

  const product = hobbies.find((product) => product.id == productId);
  const { id, medium, size, text, price, category, img, desc } = product;
  // console.log(cartItems);

  const handleDec = () => {
    setAmount((prevAmnt) => {
      // console.log("prev" + prevAmnt);

      let tempAmount = prevAmnt - 1;

      if (tempAmount < 0) {
        tempAmount = 0;
        toggleError(true, "Sorry, cannot go below 0 items!");
        setTimeout(() => {
          toggleError(); //sets the error msg back to default
        }, 1000);
      }
      // console.log("current" + tempAmount);
      return tempAmount;
    });
  };

  const handleInc = () => {
    // let newItem = e.currentTarget.parentElement.parentElement.children[0];
    setAmount((prevAmnt) => {
      // console.log("prev " + prevAmnt);

      let tempAmount = prevAmnt + 1;
      if (tempAmount > 10) {
        tempAmount = 10;
        toggleError(true, "Sorry, cannot go above 10 items!");
        setTimeout(() => {
          toggleError(); //sets the error msg back to default
        }, 1000);
      }
      // console.log("current " + tempAmount);

      return tempAmount;
    });
  };

  const addToCart = (e) => {
    // console.log("add to cart");
    let item =
      e.currentTarget.parentElement.parentElement.children[0].children[0];

    setCartItems((prevItems) => {
      let tempItem = [
        {
          amount: amount,
          price: price,
          id: item.id,
          name: item.alt,
          src: item.src,
        },
      ];

      let cartAmount = document.getElementsByClassName("cart-amount");

      if (amount > 0) {
        //if not 0 items -> add to cart
        // console.log(cartItems.findIndex((el) => el[0].name == item.alt));

        if (cartItems) {
          let foundIndex = cartItems.findIndex((el) => el[0].name == item.alt);

          if (cartItems.length == 0 || foundIndex < 0) {
            prevItems.push(tempItem);
            cartAmount[0].innerHTML = cartItems.length;
            // console.log("first time item");
            // console.log(cartItems);
            calTotal(cartItems);

            return prevItems;
          } else if (foundIndex >= 0) {
            // console.log("found same item");
            prevItems.splice(foundIndex, 1, tempItem);
            calTotal(cartItems);
            return prevItems;
          }
        }
      } else {
        return prevItems;
      }
    });
  };
  return (
    <main>
      <Wrapper>
        <div className='fixed-content' key={id}>
          <div className='side-nav-gap'></div>
          <div className='side-nav'>
            <h4>ITEM</h4>
            <h5>Category: {category.toUpperCase()} </h5>
            <h5>Price: ${price} </h5>
            <h5>Size: {size}</h5>
            <h5>Medium: {medium}</h5>
            <h5>Framed: No</h5>
            <Link
              to={{ pathname: "/", state: { fromDashboard: true } }}
              className='back'
            >
              <BiArrowBack />
            </Link>
          </div>
          <div className='store-space'>
            <Navbar></Navbar>
          </div>

          <div className='paintings-box'>
            <div className='left-side'>
              <img id={id} src={img} alt={text} />

              <div className='adj-amount'>
                <button
                  type='button'
                  className='minus'
                  onClick={(e) => handleDec(e)}
                >
                  <BiMinus />
                </button>

                <h2 className='amount'> {amount}</h2>

                <button
                  type='button'
                  className='plus'
                  onClick={(e) => handleInc(e)}
                >
                  <BiPlus />
                </button>
              </div>

              <button onClick={(e) => addToCart(e)} className='btn btn-add'>
                ADD TO CART
              </button>
              <div className='error-container'>
                {error.show ? <h1>{error.msg}</h1> : <h1>{error.msg} </h1>}
              </div>
            </div>

            <div className='disc'>
              <span className='title'>{text}</span>
              {desc}
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.nav`
  .error-container h1 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    font-family: system-ui;
    color: #bb4040;
  }
  .error-container {
    margin-bottom: 2rem;
  }
  .left-side {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .left-side img {
    margin: 0 !important;
  }
  .back {
    color: black;
    position: fixed;
    bottom: 3vh;
    font-size: 5vh;
  }
  .back:hover {
    color: #ecd7d7;
  }
  .cart-amount {
    color: black;
    font-size: 1.5rem;
    margin: 0;
  }

  .btn-add {
    position: relative !important;
    font-size: 1rem !important;
    background: #ca6e6e;
  }
  .btn-add:hover {
    background: #da9c9c;
  }
  .adj-amount {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    text-align: center;
    margin-bottom: 1rem;
  }

  .adj-amount .plus,
  .adj-amount .minus {
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    background: none;
    color: black;
  }
  .adj-amount .plus:hover,
  .adj-amount .minus:hover {
    color: #ca6e6e;
  }
  .adj-amount .amount {
    width: 2rem;
    height: 2.5rem;
    font-size: 1rem;
    color: black;
    margin: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .disc {
    width: 30%;
    font-size: 1rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    position: relative;
    right: 2vw;
    left: 2vw;
    padding-bottom: 8rem;
  }
  .btn {
    position: absolute;
    bottom: 1rem;
    font-size: 1rem;
    padding: 0.5vh;
  }
  .title {
    font-size: 2rem;
    font-weight: 400;
    padding-bottom: 1rem;
    line-height: 4rem;
  }
  .paintings-box img {
    margin-bottom: 2vh;
    margin-right: 2vw;

    width: 20rem;
  }
  .paintings-box {
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 30vw;
    flex-wrap: wrap;
    padding-top: 10rem;
    align-items: flex-start;
    align-content: flex-start;
    justify-content: center;
  }
`;

export default ProductItem;
