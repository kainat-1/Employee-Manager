import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./context/authcontext.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <App />
    </AuthContext>
  </StrictMode>
);

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import AuthContext from "./context/authcontext.jsx";

// createRoot(document.getElementById("root")).render(
//   <authContext>
//     <App />
//   </authContext>
// );
