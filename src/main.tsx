import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CartProvider } from "./context/CartContext.tsx";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <ToastContainer />
      <App />
    </CartProvider>
  </StrictMode>
);
