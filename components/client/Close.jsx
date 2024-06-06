"use client";

import styles from "@/style/Close.module.css";

export default function Close({ open }) {
    return (
        <svg
            className={`${styles.container} ${open ? styles.open : undefined}`}
            fill="currentColor"
            viewBox="0 0 22 22"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect className={styles.top} height="1.5" rx="0.75" width="18" x="2" y="10.5" />
            <rect className={styles.bottom} height="1.5" rx="0.75" width="18" x="2" y="10.5" />
        </svg>
    );
}
