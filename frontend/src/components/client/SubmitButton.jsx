"use client";

import Loading from "@/components/Loading";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            text="Envoyer"
            icon={
                pending ? (
                    <Loading
                        size={20}
                        stroke={1.5}
                    />
                ) : (
                    <ArrowRight size={20} />
                )
            }
            aria-disabled={pending}
            disabled={pending}
        />
    );
}
