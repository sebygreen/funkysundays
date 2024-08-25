"use client";

import styles from "@/style/Menu.module.css";
import Link from "next/link";
import Button from "@/components/Button";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";
import Burger from "@/components/svg/Burger";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Menu() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const path = usePathname();

    function toggle() {
        setOpen(!open);
    }

    const motions = {
        blur: {
            hidden: {
                opacity: 0,
                transition: { duration: 0.2 },
            },
            shown: {
                opacity: 1,
                transition: { duration: 0.2 },
            },
        },
        nav: {
            hidden: {},
            shown: {
                transition: { staggerChildren: 0.05, delayChildren: 0.1 },
            },
        },
        route: {
            hidden: {
                y: 10,
                opacity: 0,
                transition: { duration: 0.05, ease: "linear" },
            },
            shown: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.3, ease: "backOut" },
            },
        },
    };

    return (
        <div className={`${styles.container} ${open ? styles.open : undefined}`}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className={styles.blur}
                        variants={motions.blur}
                        initial={"hidden"}
                        animate={"shown"}
                        exit={"hidden"}
                        onClick={toggle}
                    />
                )}
            </AnimatePresence>
            <div className={styles.wrapper}>
                <AnimatePresence>
                    {open && (
                        <motion.nav
                            className={styles.nav}
                            variants={motions.nav}
                            initial={"hidden"}
                            animate={"shown"}
                            exit={"hidden"}
                        >
                            <motion.span variants={motions.route}>
                                <Link className={path === "/" ? styles.active : undefined} href={"/"} onClick={toggle}>
                                    Accueil
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/events" ? styles.active : undefined}
                                    href={"/events"}
                                    onClick={toggle}
                                >
                                    Évènements
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/artists" ? styles.active : undefined}
                                    href={"/artists"}
                                    onClick={toggle}
                                >
                                    Artistes
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/about" ? styles.active : undefined}
                                    href={"/about"}
                                    onClick={toggle}
                                >
                                    À Propos
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/contact" ? styles.active : undefined}
                                    href={"/contact"}
                                    onClick={toggle}
                                >
                                    Contact
                                </Link>
                            </motion.span>
                        </motion.nav>
                    )}
                </AnimatePresence>
                <div className={styles.actions}>
                    <Button type={"action"} icon={<ArrowLeft />} click={router.back} color={"secondary"} />
                    <Button
                        type={"action"}
                        icon={<Burger open={open} />}
                        text={"Menu"}
                        click={toggle}
                        color={"secondary"}
                    />
                </div>
            </div>
        </div>
    );
}
