// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    if (root) {
      ReactDOM.createRoot(root).render(<App />);
    }
  });