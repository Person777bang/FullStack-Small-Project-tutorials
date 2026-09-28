import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bulma/css/bulma.min.css"; // Dioptimalkan menggunakan versi minified
import "./style/index.css"; // Jalur disesuaikan ke folder src/style/

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
