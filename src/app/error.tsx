"use client";

import { useEffect } from "react";
import { SmileySad, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Error.module.css";
import Button from "@/components/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className={styles.container}>
            <SmileySad weight="fill" />
            <p>Une erreur imprévue est survenue.</p>
            <Button
                type={"action"}
                icon={<ArrowsClockwise />}
                text={"Réessayer"}
                click={() => reset()}
                color={"primary"}
            />
        </div>
    );
}
