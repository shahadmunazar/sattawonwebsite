// main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import '../src/App.css';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
