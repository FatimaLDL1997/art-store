import { StripeCheckout } from "../components";
import React from "react";
import styled from "styled-components";

// eslint-disable-next-lineclear
const Checkout = () => {
  return (
    <Wrapper>
      <main>
        <StripeCheckout />
      </main>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default Checkout;
