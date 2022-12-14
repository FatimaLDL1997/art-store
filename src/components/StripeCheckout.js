import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { formatPrice } from "../utils/helpers";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { StoreContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import CheckoutNavbar from "../components/CheckoutNavbar";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY, {
  locale: "auto",
});

const CheckoutForm = () => {
  const navigate = useNavigate();
  const {
    firstName,
    lastName,
    email,
    phone,
    postalCode,
    line1,
    line2,
    city,

    total,
    isAuthenticated,
    cartItems,
    user,
    clearCart,

    setDotNum,
  } = React.useContext(StoreContext);

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },

      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const createPaymentIntent = async () => {
    try {
      const data = await axios.post(
        "/.netlify/functions/create-payment-intent",
        JSON.stringify({ total, cartItems, user })
      );
      setClientSecret(data.data.clientSecret);
      // console.log(clientSecret);
    } catch (error) {
      // console.log(error.response);
    }
  };
  useEffect(() => {
    createPaymentIntent();
    setDotNum("3");

    //eslint-disable-next-line
  }, []);

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : " ");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: firstName + " " + lastName,
          email: email,
          phone: phone,
          address: {
            country: "CA",
            state: "ON",
            postal_code: postalCode,
            line1: line1,
            line2: line2,
            city: city,
          },
        },
      },

      // receipt_email: "fatimalabade@gmail.com",
    });

    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      clearCart();
      setDotNum("4");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  };
  const isUser = isAuthenticated && user;
  console.log(user);
  return (
    <>
      <CheckoutNavbar />

      <div className='checkout-container'>
        {succeeded ? (
          <article className='title'>
            <h4 className='title-success'>Thank You!</h4>
            <h4>Your payment was successful!</h4>
            <h4>Redirecting to home page shortly...</h4>
          </article>
        ) : (
          <article className='title'>
            <h4 className='title-start'>
              Payment Details {isUser && user.nickname}
            </h4>
            <p>Your total is {formatPrice(total)}</p>
            <p>Test Card Number: 4242 4242 4242 4242</p>
          </article>
        )}
        <form id='payment-form' onSubmit={handleSubmit}>
          <CardElement
            id='card-element'
            options={cardStyle}
            onChange={handleChange}
          />
          <button disabled={processing || disabled || succeeded} id='submit'>
            <span id='button-text'>
              {processing ? (
                <div className='spinner' id='spinner'></div>
              ) : (
                "pay"
              )}{" "}
            </span>
          </button>
          {/*show any error that happens when processing the payment*/}
          {error && (
            <div className='card-element' role='alert'>
              {error}
            </div>
          )}
          {/* show any success message upon completion  */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            Payment succeeded, see the result in your
            <a href={`https://dashboard.stripe.com/test/payments`}>
              Stripe dashboard.
            </a>
            Refresh the page to pay again.
          </p>
        </form>
      </div>
    </>
  );
};

const StripeCheckout = () => {
  //   const { total } = React.useContext(StoreContext);

  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media screen and (max-width: 800px) {
    .title-success,
    .title-start {
      font-size: 1.5rem !important;
    }
    .title p {
      font-size: 1rem !important;
      padding: 0rem 1rem 0rem 1rem;
    }
  }
  .title-success,
  .title-start  {
      position: relative;
      text-align: center;
      margin: 2rem;
      margin-top: 3rem;
      font-family: "Dancing Script", cursive;
      font-size: 3rem;
    }
  }
  .title {
    font-size: 2rem;
    text-align: center;
  }
  .checkout-container {
    padding-top: 0rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  form {
    width: 40vw;

    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  button {
    background: #ca6e6e;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }

  button:hover {
    filter: contrast(115%);
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }

  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }

  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }

  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }

  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @media only screen and (max-width: 600px) {
    form {
      width: 88vw;
      //none
    }
  }
`;

export default StripeCheckout;
