"use client";

import { useToast } from "@/context/Toast";
import styles from "@/style/common/Toasts.module.css";
import { CheckCircle, WarningCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";

interface ToastProps {
    variant: "success" | "error" | "warning";
    message: string;
}

const motions = {
    toast: {
        hidden: {
            opacity: 0,
            scale: 0.9,
            x: -15,
            transition: {
                duration: 0.2,
                type: "tween",
                easing: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
                opacity: {
                    duration: 0.2,
                    type: "tween",
                    easing: "linear",
                },
                scale: {
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.4,
                },
                x: {
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.4,
                },
            },
        },
    },
};

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

function Toast({ variant, message }: ToastProps) {
    return (
        <motion.article
            className={`${styles.toast} ${styles[variant]}`}
            layout
            transition={{
                layout: {
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.4,
                },
            }}
            variants={motions.toast}
            initial="hidden"
            animate="shown"
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
