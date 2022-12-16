import React, { useState } from "react";
import { Navbar } from "../components";
import styled from "styled-components";
import loadingImage from "../images/preloader.gif";
// import { hobbies } from "../context/data/products";
import { StoreContext } from "../context/context";
import { Link } from "react-router-dom";
// eslint-disable-next-line
const Dashboard = () => {
  const {
    setAmount,
    cartItems,
    isloading,
    products,
    setProducts,
    active,
    setActive,
    filterItems,
    menuItems,
  } = React.useContext(StoreContext);
  // const [products, setProducts] = useState(hobbies);

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  // console.log(cartItems);
  // const [menuItems, setMenuItems] = useState(products);

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

  return (
    <main className='main'>
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
            <div className='dashboard-box'>
              {menuItems.map((product) => {
                const { id, img } = product;
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

  .dashboard-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    align-items: center;
    justify-content: center;
    align-content: center;
    height: 100vh;
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
