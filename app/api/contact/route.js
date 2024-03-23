import isEmail from "validator/es/lib/isEmail";
import isEmpty from "validator/es/lib/isEmpty";
import nodemailer from "nodemailer";

export async function POST(request) {
    const res = await request.json();

    async function verifyCaptcha(token) {
        const res = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
            { method: "POST", cache: "no-store" },
        );
        const json = await res.json();
        return json.score >= 0.5;
    }

    if (!(await verifyCaptcha(res.token))) {
        return Response.json({
            toast: {
                id: Date.now(),
                type: "failure",
                message: "ReCAPTCHA has failed.",
                expired: false,
            },
        });
    }

    if (
        isEmpty(res.tag) ||
        isEmpty(res.name) ||
        isEmpty(res.email) ||
        isEmpty(res.message)
    ) {
        return Response.json({
            toast: {
                id: Date.now(),
                type: "failure",
                message: "Some or all fields are empty.",
                expired: false,
            },
        });
    }

    if (!isEmail(res.email)) {
        return Response.json({
            toast: {
                id: Date.now(),
                type: "failure",
                message: "Email field is invalid.",
                expired: false,
            },
        });
    }

    const options = {
        from: process.env.NODEMAILER_USERNAME,
        to: process.env.NODEMAILER_DESTINATION,
        subject: `Message from ${res.email}.`,
        html: `
        <p>Tag: ${res.tag}</p>
        <p>Name: ${res.name}</p>
        <p>Email: ${res.email}</p>
        <p>Message: ${res.message}</p>
        `,
    };
    const transporter = nodemailer.createTransport({
        host: "mail.infomaniak.com",
        domains: ["ik.me", "ikmail.com", "etik.com"],
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    try {
        await transporter.sendMail(options);
        return Response.json({
            toast: {
                id: Date.now(),
                type: "success",
                message: "Email sent with success.",
                expired: false,
            },
        });
    } catch (error) {
        return Response.json({
            toast: {
                id: Date.now(),
                type: "failure",
                message: "Email failed to send.",
                expired: false,
            },
        });
    }
}
