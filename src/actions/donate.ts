"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Success {
    ok: true;
    payload: string;
}

interface Failure {
    ok: false;
}

type DonateResponse = Success | Failure;

export async function donate(): Promise<DonateResponse> {
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
        return { ok: false };
    }
}
