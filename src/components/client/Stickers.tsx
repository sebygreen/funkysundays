"use client";

import styles from "@/style/Stickers.module.css";
import ball from "@/images/ball.png";
import roundPurple from "@/images/round-purple.png";
import roundPink from "@/images/round-pink.png";
import roundGradient from "@/images/round-gradient.png";
import roundPinkBlue from "@/images/round-pink-blue.png";
import roundPurpleYellow from "@/images/round-purple-yellow.png";
import seal from "@/images/seal.png";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Stickers() {
    const images = [ball, roundPurple, roundPink, roundGradient, roundPinkBlue, roundPurpleYellow, seal];

    const motions = {
        sticker: {
            hidden: {
                opacity: 0,
                scale: 0.8,
                x: 20,
            },
            shown: {
                opacity: 1,
                scale: 1,
                x: 0,
                transition: {
                    duration: 0.4,
                    ease: "backOut",
                },
            },
        },
    };

    return (
        <motion.div
            className={styles.container}
            transition={{ staggerChildren: 0.1 }}
            initial="hidden"
            animate="shown"
        >
            <div className={styles.wrapper}>
                {images.map((i, n) => (
                    <motion.span className={styles.sticker} key={n} variants={motions.sticker}>
                        <Image src={i} alt={"Funky Sundays sticker."} />
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
