import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./service/redux/store";
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="271652594446-7viu215td14m11fetc6ns6cljovo0ttq.apps.googleusercontent.com"> 

  <Provider store={store}>
    <App />
  </Provider>
  </GoogleOAuthProvider>

);
