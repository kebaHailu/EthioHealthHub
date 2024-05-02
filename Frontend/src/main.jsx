import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
// import { BrowserRouter as Broser } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
       
      </BrowserRouter>
    </Provider>
  </React.Fragment>
);
