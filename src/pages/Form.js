import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StoreContext } from "../context/context";
import { Navigate } from "react-router-dom";
import CheckoutNavbar from "../components/CheckoutNavbar";

///images/art/forest.jpg
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
    setDotNum,
  } = React.useContext(StoreContext);

  const [msg, setMsg] = useState("");

  // // States for registration
  // const [name, setName] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [filled, setFilled] = useState(false);

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

  setTimeout(() => {
    setDotNum("2");
  }, [0]);

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
  const errorMessage = (m) => {
    return (
      <div
        className='error'
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>{m}</h1>
      </div>
    );
  };

  const unFill = () => {
    console.log("unfill");
    setFilled(!filled);
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setLine1("");
    setPostalCode("");
    setCity("");
    setCountry("");
    setState("");
  };
  const testFill = () => {
    console.log("test");
    setFilled(!filled);
    setEmail("fatimalabade@gmail.com");
    setFirstName("Fatima");
    setLastName("Labade");
    setPhone("123-456-7891");
    setLine1("Unit 89-123 Rouge Hill Street");
    setPostalCode("A1B 2C3");
    setCity("Toronto");
    setCountry("CA");
    setState("ON");
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
      !email.includes("@") ||
      phone === "" ||
      address == "" ||
      city === "" ||
      state === "" ||
      country === "" ||
      postalCode === ""
    ) {
      setError(true);
      setMsg("Please enter all values");
      handleMissingMark(inputs);
      if (!email.includes("@")) {
        setMsg("Email Invalid");
      }
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
    setSubmitted(false);
    setEmail(e.target.value);
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
      <CheckoutNavbar />

      <div className='form-container'>
        <h1 className='title'>Shipping Info</h1>

        <form className='form-box'>
          <div className='title-container'>
            <h4>Before you proceed,</h4>
            <h4>Please fill in the following shipping details: </h4>
          </div>
          {/* Calling to the methods */}
          <div className='messages'>
            {errorMessage(msg)}
            {successMessage()}
          </div>

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
        </form>
      </div>
      <div className='btn-container'>
        <Link to={{ pathname: "/cart" }}>
          <button className='btn back-checkout'>BACK</button>
        </Link>

        {!filled ? (
          <button onClick={testFill} className='btn btn-test' type='submit'>
            Test fill
          </button>
        ) : (
          <button onClick={unFill} className='btn btn-test'>
            Unfill
          </button>
        )}

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
    </Wrapper>
  );
};

export default Form;
const Wrapper = styled.div`
  .title {
    position: relative;
    text-align: center;
    margin: 2rem;
    margin-top: 3rem;
    font-family: "Dancing Script", cursive;
    font-size:3rem;
  }
.btn-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10rem;
  margin-top: 2rem;
}
.title-container {
    background: #ca6e6e;

    padding: 1rem;
}
 .back-checkout {
    position: relative !important;
    // right: 10rem;
    font-size: 1rem !important;
    background: #ca6e6e;
  }
  .back-checkout:hover {
    background: #da9c9c;
  }
  .checkout-container {
    height: 6rem;
    position: absolute;
    right: 2rem;
  }
  .form-container {
    padding: 2rem;
    padding-top: 0rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:10rem;
    margin-top:0;
    margin-bottom: 2rem;
    // background: #ca6e6e;
  }
  .form-container h4 {a
    font-size: 2rem;
    font-weight: 200;
    font-family: "Crimson Text", serif;
    text-align: center;
  }
  .btn-test {
    position: relative;
    // right: 1rem;
    // bottom: 2rem;
    font-size: 1rem !important;
    background: #649b8b;
    margin: 2rem;
  }
  .btn-test:hover {
    background: #90bbae;
  }
  .btn-checkout {
    position: relative;
    // right: 1rem;
    // bottom: 2rem;
    font-size: 1rem !important;
    background: #ca6e6e;
    // margin: 2rem;
  }
  .btn-checkout:hover {
    background: #da9c9c;
  }
  .box:first-child {
    padding-top: 2rem;
  }
  .box {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-bottom: 1rem;
    align-items: center;
  }
  .form-box {
    background: #ca6e6e;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .label {
    width: 20vw;
    font-size: 1rem;
    color: #f1dde1; 
  }
  .error h1 {
    font-size: 1rem;
    font-weight: 200;
    color: pink;
  }
  .input {
    position: relative;
    width: 10rem;
    background: none;
    border-top: none;
    border-right: none;
    border-left: none;
    border-color: #f1dde1;
    color:#ffcccc;
    border-radius: 0;
  }
  .input:focus {
    border-color: black;
    outline: none !important;
  }
  .missing-mark {
    position: absolute;
    margin-left: 21vw;
    color: pink;
    display: none;
  }
  @media screen and (max-width: 800px) {
  .form-container h4 {
    font-size: 1rem; 
  }
  .form-container {
    margin:2rem !important; 
  }
  .btn-container{
    margin:2rem !important; 
  }
  .label {
    font-size: 0.8rem;
    width: 35vw; 
  }

  `;
