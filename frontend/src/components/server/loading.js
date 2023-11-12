"use client";
import { useEffect } from "react";

export default function Loader() {
    useEffect(() => {
        async function getLoader() {
            const { bouncy } = await import("ldrs");
            bouncy.register();
        }
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
