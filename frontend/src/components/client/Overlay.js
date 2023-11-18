"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { ArrowLeft, List, X } from "@phosphor-icons/react/dist/ssr";

import styles from "@/style/Overlay.module.css";
import Menu from "../Menu";
import Button from "../Button";

import { motion } from "framer-motion";

export default function Overlay() {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <aside
            id="overlay"
            className={styles.overlay}
        >
            <Menu
                shown={openMenu}
                route={usePathname()}
            />
            <section className={styles.toolbar}>
                <Button
                    type="button"
                    action={() => router.back()}
                    icon={
                        <ArrowLeft
                            size={16}
                            weight="bold"
                        />
                    }
                />
                <Button
                    type="button"
                    action={() =>
                        openMenu ? setOpenMenu(false) : setOpenMenu(true)
                    }
                    icon={openMenu ? <X size={22} /> : <List size={22} />}
                />
            </section>
        </aside>
    );
}
