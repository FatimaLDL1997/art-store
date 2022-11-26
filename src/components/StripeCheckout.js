import React from "react";
import styled from "styled-components";
// eslint-disable-next-line
const CheckoutForm = () => {
  return <h2> Hello from checkout stripe</h2>;
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  );
};
const Wrapper = styled.section``;
export default StripeCheckout;
