import React, { createContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { Toast } from "../components/shared/Toast";

type ToastType = "success" | "error";

interface ToastState {
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      setToast({ message, type });
      setTimeout(() => setToast(null), 4000); // auto-hide after 4s
    },
    []
  );

  const handleClose = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          onClose={handleClose}
          type={toast.type}
        />
      )}
    </ToastContext.Provider>
  );
};

export default ToastContext;
