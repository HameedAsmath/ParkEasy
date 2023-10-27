import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Usercontext } from "./context/Usercontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Usercontext>
        <Toaster />
        <App />
      </Usercontext>
    </Router>
  </React.StrictMode>
);
