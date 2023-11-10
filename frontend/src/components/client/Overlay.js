"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ArrowLeft, List, X } from "@phosphor-icons/react/dist/ssr";

import styles from "@/style/Overlay.module.css";
import Menu from "./Menu";
import Button from "../server/button";

export default function Overlay() {
    const router = useRouter();
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <aside
            id="overlay"
            className={styles.overlay}
        >
            <span className={styles.wrapper}>
                <Menu shown={openMenu} />
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
                        action={() => (openMenu ? setOpenMenu(false) : setOpenMenu(true))}
                        icon={openMenu ? <X size={22} /> : <List size={22} />}
                    />
                </section>
            </span>
        </aside>
    );
}
