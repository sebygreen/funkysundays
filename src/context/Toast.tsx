"use client";

import React, { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface Toast {
    id: string;
    variant: "error" | "warning" | "success";
    message: string;
}

interface ContextProps {
    toasts: Toast[];
    newToast: (variant: "error" | "warning" | "success", message: string) => void;
}

interface ProviderProps {
    children: ReactNode;
}

export const ToastContext = createContext<ContextProps>({
    toasts: [],
    newToast: () => null,
});

export function useToast() {
    const value = useContext(ToastContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) throw new Error("useToast must be wrapped in a <ToastProvider />");
    }
    return value;
}

export function ToastProvider({ children }: ProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const newToast = useCallback((variant: "error" | "warning" | "success", message: string) => {
        const toast: Toast = {
            id: uuidv4(),
            variant: variant,
            message: message,
        };
        setToasts((prevToasts: Toast[]) => [...prevToasts, toast]);
        setTimeout(() => {
            setToasts((prevState: Toast[]) => prevState.filter((item: Toast) => item.id !== toast.id));
        }, 7000);
    }, []);

    return <ToastContext.Provider value={{ toasts, newToast }}>{children}</ToastContext.Provider>;
}
