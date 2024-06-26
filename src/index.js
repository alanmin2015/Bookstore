
import React from "react";
import ReactDOM from "react-dom/client"; 
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import './index.css';

import store from './store/index.js';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));  // Create a root

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
