import { useState } from "react";
import { Toast } from "../components/Toast/Toast";
import { ToastContext } from "../contexts/toast.context";
import type { ToastType } from "../contexts/toast.context";

type ToastData = {
  message: string;
  type: ToastType;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
}