import styles from "@/style/form/Input.module.css";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { ChangeEvent, ChangeEventHandler } from "react";

const motions = {
    error: {
        hidden: {
            opacity: 0,
            y: -5,
            transition: { duration: 0.2 },
        },
        shown: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 },
        },
    },
};

interface LabelProps {
    name: string;
    label: string;
    error?: string | null;
}

export default function Label({ ...props }: LabelProps) {
    return (
        <div className={styles.label}>
            <label htmlFor={props.name}>{props.label}</label>
            <AnimatePresence>
                {props.error && (
                    <motion.p initial="hidden" animate="shown" exit="hidden" variants={motions.error}>
                        {props.error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
