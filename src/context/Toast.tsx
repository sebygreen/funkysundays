"use client";

import React, { createContext, ReactNode, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const ToastContext = createContext<any>([]);

export interface Toast {
    id: string;
    variant: "error" | "success" | "warning";
    message: string;
}

interface ToastProviderProps {
    children: ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const newToast = useCallback(
        (variant: "error" | "success" | "warning", message: string) => {
            const toast: Toast = {
                id: uuidv4(),
                variant: variant,
                message: message,
            };
            setToasts((prevToasts: Toast[]) => [...prevToasts, toast]);
            setTimeout(() => {
                setToasts((prevState: Toast[]) => prevState.filter((item: Toast) => item.id !== toast.id));
            }, 5000);
        },
        [setToasts],
    );

    return <ToastContext.Provider value={{ toasts, newToast }}>{children}</ToastContext.Provider>;
}
