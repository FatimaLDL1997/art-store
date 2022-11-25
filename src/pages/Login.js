import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import loginImg from "../images/login-img.png";
const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <div className='container'>
        <img src={loginImg} alt='user' />
      </div>
      <div className='card'>
        <h1>Welcome!</h1>
        <button className='btn' onClick={loginWithRedirect}>
          Login/Sign Up
        </button>
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
  }
  .card {
    position: absolute;
    width: 31rem;
    height: 18rem;
    background: #dd6969;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 100vw;
    height: 100vh;
  }
  h1 {
    top: 50vh;
    left: 50vw;
    font-size: 3rem;
    font-family: "Kaushan Script", cursive;
  }
`;
export default Login;
