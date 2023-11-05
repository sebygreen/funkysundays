"use client";

import { useRouter } from "next/navigation";
import Button from "../server/button";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function Back() {
    const router = useRouter();
    return (
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
    );
}
