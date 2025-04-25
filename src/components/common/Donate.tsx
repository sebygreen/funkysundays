"use client";

import { donate } from "@/actions/donate";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { ToastContext } from "@/context/Toast";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useContext, useEffect } from "react";
import styles from "@/style/home/Donate.module.css";
import { HandHeart } from "@phosphor-icons/react/dist/ssr";

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Donate() {
    const router = useRouter();
    const { newToast } = useContext(ToastContext);
    const searchParams = useSearchParams();
    const [state, dispatch, pending] = useActionState(donate, null);

    useEffect(() => {
        if (state && !state.ok) newToast("error", state.payload);
        if (state && state.ok) router.push(state.payload);
    }, [newToast, router, state]);

    useEffect(() => {
        if (searchParams.get("canceled")) {
            newToast("warning", "La session Stripe à été annulé.");
            router.replace("/donation", undefined);
        }
    }, [newToast, router, searchParams]);

    return (
        <form action={dispatch} className={styles.container}>
            <Button type="submit" color="secondary" text="Contribuer" icon={pending ? <Loader /> : <HandHeart />} />
        </form>
    );
}
