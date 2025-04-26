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
import { useReCaptcha } from "next-recaptcha-v3";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Donate() {
    const router = useRouter();
    const { newToast } = useToast();
    const { executeRecaptcha } = useReCaptcha();
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
            try {
                const token = await executeRecaptcha("donate");
                const res = await donate(token);
                if (!res.ok) {
                    newToast("error", "Une erreur est survenue.");
                } else {
                    router.push(res.payload);
                }
            } catch (e) {
                newToast("error", "Une erreur est survenue.");
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
