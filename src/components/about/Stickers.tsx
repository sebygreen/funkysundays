"use client";

import styles from "@/style/about/Stickers.module.css";
import {
    Ball,
    RoundGradient,
    RoundPink,
    RoundPinkBlue,
    RoundPurple,
    RoundYellowPurple,
} from "@/components/svg/Sticker";
import { motion } from "motion/react";

const motions = {
    sticker: {
        hidden: {
            scale: 0.8,
            opacity: 0,
        },
        shown: {
            scale: 1,
            opacity: 1,
            transition: {
                opacity: {
                    type: "tween",
                    easing: "linear",
                    duration: 0.4,
                },
                scale: {
                    type: "spring",
                    duration: 0.8,
                    bounce: 0.6,
                },
            },
        },
    },
};

export default function Stickers() {
    const images = [
        <Ball key={1} />,
        <RoundPurple key={2} />,
        <RoundPink key={3} />,
        <RoundGradient key={4} />,
        <RoundPinkBlue key={5} />,
        <RoundYellowPurple key={6} />,
    ];

    return (
        <div className={styles.container}>
            <motion.div
                className={styles.wrapper}
                transition={{ staggerChildren: 0.1 }}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true }}
            >
                {images.map((i, n) => (
                    <motion.span className={styles.sticker} key={n} variants={motions.sticker}>
                        {i}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
}
