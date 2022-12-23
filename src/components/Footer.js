import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <div className='container'>footer</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .container {
    width: 100vw;
    background: black;
    height: 20rem;
  }
`;
export default Footer;
