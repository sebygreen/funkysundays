"use client";
import { useEffect } from "react";

export default function Loading({ size, stroke }) {
    async function getLoader() {
        const { ring } = await import("ldrs");
        ring.register();
    }
    useEffect(() => {
        getLoader();
    }, []);
    return (
        <section className="loading">
            <l-ring
                size={size}
                stroke={stroke}
                bg-opacity="0"
                speed="2"
                color="#F7CBE0"
            ></l-ring>
        </section>
    );
}
