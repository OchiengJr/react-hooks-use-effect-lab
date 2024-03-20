// index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

// Render the App component to the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  console.error("Root element not found in the HTML document");
}
