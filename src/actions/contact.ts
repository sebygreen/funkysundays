"use server";

import { verifyCaptcha } from "@/utilities/fetch/providers";
import { ContactFormErrors, validateContact } from "@/utilities/validation/contact";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { render } from "@react-email/components";
import EmailContact from "@/emails/EmailContact";

interface Success {
    ok: true;
    toast: string;
}

interface Failure {
    ok: false;
    toast: string;
    payload?: ContactFormErrors;
}

type ContactResponse = Success | Failure;

export async function contact(data: FormData, token: string): Promise<ContactResponse> {
    if (!(await verifyCaptcha(token))) {
        return {
            ok: false,
            toast: "La verification ReCAPTCHA a échouée.",
        };
    }

    const values = Object.fromEntries(data.entries());
    const checked = validateContact(values, "required");
    if (!checked.ok) {
        return {
            ok: false,
            toast: "Le formulaire contient des erreurs.",
            payload: checked.errors,
        };
    }

    const transporter = nodemailer.createTransport({
        host: "mail.infomaniak.com",
        domains: ["ik.me", "ikmail.com", "etik.com"],
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USERNAME,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    } as SMTPTransport.Options);
    const rendered = await render(EmailContact(checked.values));
    const options = {
        from: {
            name: "funkysundays.com",
            address: process.env.NODEMAILER_USERNAME!,
        },
        to: process.env.NODEMAILER_DESTINATION,
        subject: `Message from ${checked.values.email}.`,
        html: rendered,
    };

    try {
        await transporter.sendMail(options);
        return {
            ok: true,
            toast: "Message envoyé avec succès.",
        };
    } catch (e) {
        console.error(e);
        return {
            ok: false,
            toast: "L'envoi du message à échoué.",
        };
    }
}
