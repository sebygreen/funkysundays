import styles from "@/style/Menu.module.css";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

export default function Menu({ shown }) {
    const menu = {
        visible: {
            transition: {
                staggerChildren: -0.05,
            },
        },
        hidden: {
            transition: {
                staggerChildren: -0.05,
            },
        },
    };
    const item = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                ease: "backOut",
                duration: 0.4,
            },
        },
        hidden: {
            opacity: 0,
            y: 10,
            transition: {
                ease: "backIn",
                duration: 0.3,
            },
        },
    };
    return (
        <AnimatePresence>
            {shown && (
                <nav className={styles.menu}>
                    <motion.ul
                        variants={menu}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.li variants={item}>
                            <Link href="/">Home</Link>
                        </motion.li>
                        <motion.li variants={item}>
                            <Link href="/events">Events</Link>
                        </motion.li>
                        <motion.li variants={item}>
                            <Link href="/artists">Artists</Link>
                        </motion.li>
                        <motion.li variants={item}>
                            <Link href="/about">About</Link>
                        </motion.li>
                    </motion.ul>
                </nav>
            )}
        </AnimatePresence>
    );
}
