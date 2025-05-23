"use client";

import styles from "@/style/layout/Menu.module.css";
import Link from "next/link";
import Button from "@/components/common/Button";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";
import Burger from "@/components/svg/Burger";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { clsx } from "clsx";

const motions = {
    blur: {
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.1,
                type: "tween",
                easing: "linear",
            },
        },
        shown: {
            opacity: 1,
            transition: {
                duration: 0.2,
                type: "tween",
                easing: "linear",
            },
        },
    },
    nav: {
        hidden: {},
        shown: {
            transition: { staggerChildren: 0.025, delayChildren: 0.1 },
        },
    },
    route: {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: 10,
            transition: {
                duration: 0.1,
                type: "tween",
                easing: "easeIn",
            },
        },
        shown: {
            opacity: 1,
            scale: 1,
            y: 0,
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
                y: {
                    duration: 0.4,
                    type: "spring",
                    bounce: 0.4,
                },
            },
        },
    },
};

export default function Menu() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const path = usePathname();

    function toggle() {
        setOpen(!open);
    }

    return (
        <div className={clsx(styles.container, open && styles.open)}>
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
                                    href="/events"
                                    onClick={toggle}
                                >
                                    Évènements
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/artists" ? styles.active : undefined}
                                    href="/artists"
                                    onClick={toggle}
                                >
                                    Artistes
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/sponsors" ? styles.active : undefined}
                                    href="/sponsors"
                                    onClick={toggle}
                                >
                                    Sponsors
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/about" ? styles.active : undefined}
                                    href="/about"
                                    onClick={toggle}
                                >
                                    À Propos
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/donation" ? styles.active : undefined}
                                    href="/donation"
                                    onClick={toggle}
                                >
                                    Contribuer
                                </Link>
                            </motion.span>
                            <motion.span variants={motions.route}>
                                <Link
                                    className={path === "/contact" ? styles.active : undefined}
                                    href="/contact"
                                    onClick={toggle}
                                >
                                    Contact
                                </Link>
                            </motion.span>
                        </motion.nav>
                    )}
                </AnimatePresence>
                <div className={styles.actions}>
                    <Button type="action" icon={<ArrowLeft />} onClick={router.back} color="secondary" />
                    <Button
                        type="action"
                        icon={<Burger open={open} />}
                        text="Menu"
                        onClick={toggle}
                        color="secondary"
                    />
                </div>
            </div>
        </div>
    );
}
