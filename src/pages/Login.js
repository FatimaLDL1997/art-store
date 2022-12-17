import React, { useEffect, useState } from "react";
import { StoreContext } from "../context/context";
import styled from "styled-components";
import loginImg from "../images/login-img.png";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { loginAsGuest, setLoginAsGuest, loginWithRedirect } =
    React.useContext(StoreContext);

  console.log(loginAsGuest);

  useEffect(() => {
    //solves the issue with refreshing and 404 error
    let data = window.performance.getEntriesByType("navigation")[0].type;
    console.log(data);

    if (data == "reload" || loginAsGuest) {
      console.log("reloaded");
      window.location.assign("/");
    }
  }, []);

  return (
    <Wrapper>
      <div className='container'>
        <img src={loginImg} className='background-img' alt='user' />
        <div className='card'>
          <h1>Welcome!</h1>
          <button className='btn' onClick={loginWithRedirect}>
            Login/Sign Up
          </button>
          <button className='btn' onClick={() => setLoginAsGuest(true)}>
            Login As Guest
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;

  .container {
    position: absolute;
    width: 100vw;
    height: 100vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden !important;
  }
  .background-img {
    position: relative;
    width: auto;
    height: 100vh;
  }
  .card {
    position: absolute;
    width: 30vw;
    height: 50vh;
    background: #dd6969;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: none;
  }
  h1 {
    top: 50vh;
    left: 50vw;
    font-size: 3rem;
    font-family: "Kaushan Script", cursive;
  }
`;
export default Login;
