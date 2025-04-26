"use client";

import { useToast } from "@/context/Toast";
import styles from "@/style/common/Toasts.module.css";
import { CheckCircle, WarningCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";

export default function Toasts() {
    const { toasts } = useToast();

    return (
        <aside className={styles.toasts}>
            <AnimatePresence>
                {toasts.length > 0 &&
                    toasts.map((i: any) => <Toast key={i.id} variant={i.variant} message={i.message} />)}
            </AnimatePresence>
        </aside>
    );
}

interface ToastProps {
    variant: "success" | "error" | "warning";
    message: string;
}

function Toast({ variant, message }: ToastProps) {
    const toast = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
                type: "spring",
                bounce: 0.1,
                damping: 7,
                mass: 0.5,
            },
        },
        hidden: {
            opacity: 0,
            x: -10,
            transition: {
                duration: 0.1,
                type: "tween",
            },
        },
    };

    return (
        <motion.article
            className={`${styles.toast} ${styles[variant]}`}
            layout
            transition={{
                layout: {
                    duration: 0.2,
                    type: "spring",
                    bounce: 0.1,
                    damping: 10,
                    mass: 0.5,
                },
            }}
            variants={toast}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <p>{message}</p>
            {variant === "error" ?
                <XCircle size={22} weight="fill" />
            : variant === "success" ?
                <CheckCircle size={22} weight="fill" />
            :   <WarningCircle size={22} weight="fill" />}
        </motion.article>
    );
}
