"use client";

import styles from "./error.module.css";
import { useEffect } from "react";
import Button from "@/components/Button";
import { ArrowCounterClockwise, MaskSad } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import revalidate from "@/lib/revalidate";

export default function Error({ error, reset }) {
    const pathname = usePathname();
    useEffect(() => {
        console.error(error);
    }, [error]);

    async function handleClick() {
        await revalidate(pathname);
        reset();
    }

    return (
        <div className={styles.container}>
            <MaskSad size={64} weight="duotone" />
            <h2>
                Une erreur s&apos;est produite lors du chargement de la page.
            </h2>
            <Button
                type="button"
                text="Réessayer"
                icon={<ArrowCounterClockwise size={22} />}
                action={handleClick}
            />
        </div>
    );
}
