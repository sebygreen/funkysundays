import { verifyCaptcha } from "@/utilities/fetch/providers";
import { validateContact } from "@/utilities/validation/contact";
import { NextRequest } from "next/server";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import EmailContact from "@/emails/EmailContact";

export async function POST(request: NextRequest) {
    const req = await request.json();

    // recaptcha
    if (!(await verifyCaptcha(req.token))) {
        return Response.json({
            ok: false,
            toast: "La verification ReCAPTCHA a échouée.",
        });
    }

    // validation
    const validated = validateContact(req.values);
    if (!validated.ok) {
        return Response.json({
            ok: false,
            toast: "Le formulaire contient des erreurs.",
            payload: validated.errors,
        });
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

    // html
    const rendered = await render(EmailContact(req.values));

    // send
    const options = {
        from: {
            name: "funkysundays.com",
            address: process.env.NODEMAILER_USERNAME!,
        },
        to: process.env.NODEMAILER_DESTINATION,
        subject: `Message from ${req.values.email}.`,
        html: rendered,
    };

    try {
        await transporter.sendMail(options);
        return Response.json({
            ok: true,
            toast: "Message envoyé avec succès.",
        });
    } catch (error) {
        console.error(error);
        return Response.json({
            ok: false,
            toast: "L'envoi du message à échoué.",
        });
    }
}
