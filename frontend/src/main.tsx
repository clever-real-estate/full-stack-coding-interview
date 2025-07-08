import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <h1>Hello</h1>
  </StrictMode>
);
