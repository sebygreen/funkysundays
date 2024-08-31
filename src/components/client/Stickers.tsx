"use client";

import styles from "@/style/Stickers.module.css";
import { motion } from "framer-motion";
import {
    Ball,
    RoundGradient,
    RoundPink,
    RoundPinkBlue,
    RoundPurple,
    RoundYellowPurple,
} from "@/components/svg/Sticker";

export default function Stickers() {
    const images = [
        <Ball key={1} />,
        <RoundPurple key={2} />,
        <RoundPink key={3} />,
        <RoundGradient key={4} />,
        <RoundPinkBlue key={5} />,
        <RoundYellowPurple key={6} />,
    ];

    const motions = {
        sticker: {
            hidden: {
                opacity: 0,
                scale: 0.8,
                x: 100,
            },
            shown: {
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 1,
                    ease: [0, 0.55, 0.45, 1],
                },
            },
        },
    };

    return (
        <motion.div className={styles.container} transition={{ staggerChildren: 0.3 }} initial="hidden" animate="shown">
            <div className={styles.wrapper}>
                {images.map((i, n) => (
                    <motion.span className={styles.sticker} key={n} variants={motions.sticker}>
                        {i}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
