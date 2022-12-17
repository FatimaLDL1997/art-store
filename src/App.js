import React from "react";
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import ProductItem from "./pages/ProductItem";
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import { StoreContext } from "./context/context";

function App() {
  const { loginAsGuest } = React.useContext(StoreContext);

  return (
    <AuthWrapper>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              loginAsGuest ? (
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              ) : (
                <Dashboard />
              )
            }
          />
          <Route
            exact
            path='/:productId'
            element={
              loginAsGuest ? (
                <PrivateRoute>
                  <ProductItem />
                </PrivateRoute>
              ) : (
                <ProductItem />
              )
            }
          />
          <Route
            exact
            path='/cart'
            element={
              loginAsGuest ? (
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              ) : (
                <Cart />
              )
            }
          />
          <Route
            exact
            path='/checkout'
            element={
              loginAsGuest ? (
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              ) : (
                <Checkout />
              )
            }
          />
          <Route
            exact
            path='/form'
            element={
              loginAsGuest ? (
                <PrivateRoute>
                  <Form />
                </PrivateRoute>
              ) : (
                <Form />
              )
            }
          />

          <Route path='login' element={<Login />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;
