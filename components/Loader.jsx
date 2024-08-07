"use client";
import { useEffect } from "react";

export default function Loader({ size, stroke }) {
    async function getLoader() {
        const { ring } = await import("ldrs");
        ring.register();
    }

    useEffect(() => {
        void getLoader();
    }, []);
    return (
        <l-ring
            size={size ? size : "22"}
            stroke={stroke ? stroke : "2"}
            bg-opacity="0"
            speed="2"
            color="#F7CBE0"
        ></l-ring>
    );
}
