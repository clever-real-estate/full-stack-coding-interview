import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, type }) => (
  <div
    className={`fixed top-6 right-6 z-50 ${
      type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white px-6 py-3 rounded shadow-lg flex items-center`}
  >
    <span>{message}</span>
    <button
      className="ml-4 text-white font-bold"
      onClick={onClose}
      aria-label="Close"
    >
      ×
    </button>
  </div>
);
