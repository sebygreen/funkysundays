"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface Response {
    ok: boolean;
    payload: string;
}

export async function donate(): Promise<Response> {
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
        return {
            ok: true,
            payload: session.url,
        };
    } catch (error: any) {
        return {
            ok: false,
            payload: error.message,
        };
    }
}
