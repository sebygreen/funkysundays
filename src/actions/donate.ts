"use server";

import { verifyCaptcha } from "@/utilities/fetch/providers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Success {
    ok: true;
    payload: string;
}

interface Failure {
    ok: false;
    toast: string;
}

type DonateResponse = Success | Failure;

export async function donate(token: string): Promise<DonateResponse> {
    if (!(await verifyCaptcha(token))) {
        return {
            ok: false,
            toast: "La verification ReCAPTCHA a échouée.",
        };
    }

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1QdXuNPMKt84Biqr7JlaBTQv",
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/donation/success`,
            cancel_url: `${process.env.FRONTEND_URL}/donation?canceled=true`,
        });
        return { ok: true, payload: session.url };
    } catch (e) {
        console.error(e);
        return { ok: false, toast: "La session Stripe n'a pas été crée." };
    }
}
