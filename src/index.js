import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
//dev-ucxj3l5obyfjomqw.us.auth0.com
//EyeOlVk79Ql67wBLnnGiuF8JbPeVdl0D
ReactDOM.render(
  <Auth0Provider
    domain='dev-ucxj3l5obyfjomqw.us.auth0.com'
    clientId='wGPE9bBzx3yoT5zLN0CMhs2FcCKR9D71'
    redirectUri={window.location.origin}
    cacheLocation='localstorage'
  >
    <StoreProvider>
      <App />
    </StoreProvider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
