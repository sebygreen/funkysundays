import styles from "@/style/Menu.module.css";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Menu({ shown, route, close }) {
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
                ease: "linear",
                duration: 0.2,
            },
        },
    };
    return (
        <AnimatePresence>
            {shown && (
                <nav className={styles.menu}>
                    <motion.ul variants={menu} initial="hidden" animate="visible" exit="hidden">
                        <motion.li variants={item}>
                            <Link href="/" className={route === "/" ? styles.active : undefined} onClick={close}>
                                Accueil
                            </Link>
                        </motion.li>
                        <motion.li variants={item}>
                            <Link
                                href={"/events"}
                                className={route === "/events" ? styles.active : undefined}
                                onClick={close}
                            >
                                Évènements
                            </Link>
                        </motion.li>
                        <motion.li variants={item}>
                            <Link
                                href={"/artists"}
                                className={route === "/artists" ? styles.active : undefined}
                                onClick={close}
                            >
                                Artistes
                            </Link>
                        </motion.li>
                        <motion.li variants={item}>
                            <Link
                                href={"/about"}
                                className={route === "/about" ? styles.active : undefined}
                                onClick={close}
                            >
                                À Propos
                            </Link>
                        </motion.li>
                        <motion.li variants={item}>
                            <Link
                                href={"/contact"}
                                className={route === "/contact" ? styles.active : undefined}
                                onClick={close}
                            >
                                Contact
                            </Link>
                        </motion.li>
                    </motion.ul>
                </nav>
            )}
        </AnimatePresence>
    );
}
