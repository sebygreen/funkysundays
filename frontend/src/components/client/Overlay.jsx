"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, List, X } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Overlay.module.css";
import Menu from "../Menu";
import Button from "../Button";
import { AnimatePresence, motion } from "framer-motion";

export default function Overlay() {
    const router = useRouter();
    const [menu, setMenu] = useState(false);

    function toggleMenu(e) {
        e && e.stopPropagation();
        menu ? setMenu(false) : setMenu(true);
    }

    const backdrop = {
        visible: {
            opacity: 1,
            transition: {
                ease: "linear",
                duration: 0.2,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                ease: "linear",
                duration: 0.2,
            },
        },
    };

    return (
        <div className={styles.overlay}>
            <AnimatePresence>
                {menu && (
                    <motion.div
                        className={styles.backdrop}
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={(e) => toggleMenu(e)}
                    />
                )}
            </AnimatePresence>
            <Menu
                shown={menu}
                route={usePathname()}
            />
            <div className={styles.toolbar}>
                <Button
                    type="button"
                    action={() => router.back()}
                    icon={<ArrowLeft size={20} />}
                />
                <Button
                    type="button"
                    action={() => toggleMenu()}
                    text="Menu"
                    icon={menu ? <X size={20} /> : <List size={20} />}
                />
            </div>
        </div>
    );
}
