"use client";

import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { useToast } from "@/context/Toast";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import styles from "@/style/home/Donate.module.css";
import { HandHeart } from "@phosphor-icons/react/dist/ssr";
import { donate } from "@/actions/donate";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Donate() {
    const router = useRouter();
    const { newToast } = useToast();
    const searchParams = useSearchParams();
    const [pending, dispatch] = useTransition();

    useEffect(() => {
        if (searchParams.get("canceled")) {
            newToast("success", "La session Stripe à été annulée.");
            router.replace("/donation", undefined);
        }
    }, [newToast, router, searchParams]);

    function handleClick() {
        if (pending) return;
        dispatch(async () => {
            const res = await donate();
            if (!res.ok) {
                newToast("error", "Une erreur est survenue.");
            } else {
                router.push(res.payload);
            }
        });
    }

    return (
        <div className={styles.container}>
            <Button
                type="action"
                color="secondary"
                text="Contribuer"
                icon={<HandHeart />}
                disabled={pending}
                onClick={handleClick}
            />
            {pending && <Loader />}
        </div>
    );
}
