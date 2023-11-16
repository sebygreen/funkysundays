"use client";
import { useEffect } from "react";

export default function Loading() {
    async function getLoader() {
        const { bouncy } = await import("ldrs");
        bouncy.register();
    }
    useEffect(() => {
        getLoader();
    }, []);
    return (
        <section className="loading">
            <l-bouncy
                size="45"
                speed="1.75"
                color="white"
            ></l-bouncy>
        </section>
    );
}
