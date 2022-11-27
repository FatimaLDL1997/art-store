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
        <StripeCheckout />
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding-top: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default Checkout;
