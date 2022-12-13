import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StoreProvider, StoreContext } from "../context/context";
import { Navigate } from "react-router-dom";

const Form = () => {
  const {
    firstName,
    lastName,
    setFirstName,
    setLastName,
    email,
    setEmail,
    phone,
    setPhone,
    country,
    setCountry,
    state,
    setState,
    postalCode,
    setPostalCode,
    line1,
    setLine1,
    line2,
    setLine2,
    city,
    setCity,
  } = React.useContext(StoreContext);

  // States for registration
  const [name, setName] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  let missingMark = document.getElementsByClassName("missing-mark");
  let emptyIndecies = [];
  let fullIndecies = [];

  let address = "";
  let inputs = [
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    country,
    postalCode,
  ];

  const handleMissingMark = (inputs) => {
    //looks for hte index at which input is empthy '
    inputs.filter((input, index) => {
      if (input == "") {
        emptyIndecies.push(index);
      }
      if (input != "") {
        fullIndecies.push(index);
      }
      return input === "";
    });
    console.log(emptyIndecies);

    console.log(fullIndecies);

    emptyIndecies.map((index) => {
      // displays * beside empty inputs
      missingMark[index].style.display = "block";
      console.log("last");
    });

    fullIndecies.map((index) => {
      // hids * beside full inputs
      missingMark[index].style.display = "none";
    });
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className='success'
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {firstName + " " + lastName} successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className='error'
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let address = "";
    if (line1 !== "" || line2 !== "") {
      address = line1 + " " + line2;
    }
    let inputs = [
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      country,
      postalCode,
    ];

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      address == "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      postalCode === ""
    ) {
      setError(true);
      handleMissingMark(inputs);
    } else {
      handleMissingMark(inputs);
      setSubmitted(true);
      setError(false);
    }
  };

  // Handling the first name change
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };
  // Handling the last name change
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };
  // Handling the email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  // Handling the phone change
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };
  // Handling the country change
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setSubmitted(false);
  };
  // Handling the city change
  const handleCityChange = (e) => {
    setCity(e.target.value);
    setSubmitted(false);
  };
  // Handling the line1 change
  const handleLine1Change = (e) => {
    setLine1(e.target.value);
    setSubmitted(false);
  };
  // Handling the line2 change
  const handleLine2Change = (e) => {
    setLine2(e.target.value);
    setSubmitted(false);
  };
  // Handling the postal Code change
  const handlePostalChange = (e) => {
    setPostalCode(e.target.value);
    setSubmitted(false);
  };
  // Handling the state/province change
  const handleProvChange = (e) => {
    setState(e.target.value);
    setSubmitted(false);
  };
  return (
    <Wrapper>
      <div className='form-container'>
        <h4>Before you proceed,</h4>
        <h4>Please fill in the following: </h4>

        {/* Calling to the methods */}
        <div className='messages'>
          {errorMessage()}
          {successMessage()}
        </div>

        <form className='form-box'>
          <div className='box'>
            <label className='label'> First Name</label>
            <input
              onChange={handleFirstName}
              className='input'
              value={firstName}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Last Name</label>
            <input
              onChange={handleLastName}
              className='input'
              value={lastName}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Email</label>
            <input
              onChange={handleEmailChange}
              className='input'
              value={email}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Phone</label>
            <input
              onChange={handlePhoneChange}
              className='input'
              value={phone}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Line 1</label>
            <input
              onChange={handleLine1Change}
              className='input'
              value={line1}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Line 2</label>
            <input
              onChange={handleLine2Change}
              className='input'
              value={line2}
              type='text'
            />
          </div>

          <div className='box'>
            <label className='label'>City</label>
            <input
              onChange={handleCityChange}
              className='input'
              value={city}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Province</label>
            <input
              onChange={handleProvChange}
              className='input'
              value={state}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Country</label>
            <input
              onChange={handleCountryChange}
              className='input'
              value={country}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>

          <div className='box'>
            <label className='label'>Postal Code</label>
            <input
              onChange={handlePostalChange}
              className='input'
              value={postalCode}
              type='text'
            />
            <div className='missing-mark'>*</div>
          </div>
          <div className='box'>
            {!submitted ? (
              <button
                onClick={handleSubmit}
                className='btn btn-checkout'
                type='submit'
              >
                Submit
              </button>
            ) : (
              <Navigate replace to='/checkout' />
            )}
          </div>
        </form>
      </div>
    </Wrapper>
  );
};

export default Form;
const Wrapper = styled.div`
  .checkout-container {
    height: 6rem;
    position: absolute;
    right: 2rem;
  }
  .form-container {
    padding: 2rem;
  }
  .btn-checkout {
    position: fixed;
    right: 1rem;
    bottom: 2rem;
    font-size: 1rem !important;
    background: #ca6e6e;
  }
  .btn-checkout:hover {
    background: #da9c9c;
  }
  .box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 1rem;
  }
  .form-box {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .label {
    padding-left: 1rem;
    padding-right: 0.5rem;
  }
  .error h1 {
    font-size: 2rem;
    font-weight: 200;
    color: red;
  }
  .input {
    position: absolute;
    margin-left: 7rem;
    width: 10rem;
  }
  .missing-mark {
    position: absolute;
    margin-left: 17rem;
    color: red;
    display: none;
  }
`;
