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
              <PrivateRoute>
                <ProductItem />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path='/cart'
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path='/checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path='/form'
            element={
              <PrivateRoute>
                <Form />
              </PrivateRoute>
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
