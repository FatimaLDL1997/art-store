import React, { useState } from "react";
import { Navbar } from "../components";
import styled from "styled-components";
import loadingImage from "../images/preloader.gif";
import { HiShoppingCart } from "react-icons/hi";
import { hobbies } from "../context/data/products";
import { StoreProvider, StoreContext } from "../context/context";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { amount, setAmount, cartItems, setCartItems, isloading } =
    React.useContext(StoreContext);
  const [products, setProducts] = useState(hobbies);
  const [active, setActive] = useState("0");

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  console.log(cartItems);
  const [menuItems, setMenuItems] = useState(products);

  if (isloading) {
    return (
      <main>
        <Navbar />
        <div className='preloader'>
          <img classNames='loading-img' src={loadingImage} />
        </div>
      </main>
    );
  }
  const filterItems = (item, index) => {
    if (item === "all") {
      setMenuItems(products);
      console.log(menuItems);
      setActive(index);

      return;
    }

    const newItems = products.filter((product) => product.category === item);
    setMenuItems(newItems);
    setActive(index);
  };

  return (
    <main>
      <Wrapper>
        <div className='fixed-content'>
          <div className='side-nav-gap'></div>
          <div className='side-nav'>
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
          <div className='store-space'>
            <Navbar></Navbar>
            <div className='paintings-box'>
              {menuItems.map((product) => {
                const { id, img, text, price, category } = product;
                return (
                  <div key={id} className='box'>
                    <Link to={`${id}`}>
                      <img src={img} onClick={() => setAmount(0)} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.nav`
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
  .box {
    background: #aec3b2;
    margin: 1rem;
    width: 17rem;
    height: 17rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box:hover {
    cursor: pointer;
    background: #75a87e;
  }

  .paintings-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    align-items: center;
    justify-content: center;
    align-content: center;
  }
  .box img {
    width: 15rem;
    height: 15rem;
  }
  .circle {
    border-radius: 50%;
    background: white;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 6vh;
    right: 4vw;
    width: 2rem;
    height: 2rem;
    z-index: 0;
    opacity: 0.8;
  }
  .cart-amount {
    color: black;
    font-size: 1.5rem;
    margin: 0;
  }
`;

export default Dashboard;
