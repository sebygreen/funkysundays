import { fetchCaptcha } from "@/utilities/fetch";
import { string, StringSchema, ValidationError } from "yup";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export async function POST(request: Request) {
    const res = await request.json();

    if (!(await fetchCaptcha(res.token))) {
        return Response.json({
            type: "error",
            message: "La verification ReCAPTCHA a échouée.",
        });
    }

    const schemas: {
        [key: string]: StringSchema;
    } = {
        subject: string<"member" | "volunteer" | "artist" | "question" | "feedback" | "other">().required(
            "Ce champ est requis.",
        ),
        name: string().required("Ce champ est requis.").trim(),
        email: string().required("Ce champ est requis.").email("Cet email est invalide."),
        message: string().required("Ce champ est requis."),
    };
    const errors: {
        [key: string]: string | null;
    } = {
        subject: null,
        name: null,
        email: null,
        message: null,
    };
    const validate = async (field: "subject" | "name" | "email" | "message") => {
        try {
            await schemas[field].validate(res.fields[field]);
        } catch (e) {
            if (e instanceof ValidationError) {
                errors[field] = e.errors[0];
            }
        }
    };
    await validate("subject");
    await validate("name");
    await validate("email");
    await validate("message");
    if (Object.entries(errors).find((i) => i[1])) {
        return Response.json({
            type: "error",
            message: "Les données du formulaire sont invalides.",
            errors: errors,
        });
    }

    const options = {
        from: process.env.NODEMAILER_USERNAME,
        to: process.env.NODEMAILER_DESTINATION,
        subject: `Message from ${res.fields.email}.`,
        html: `
        <p>Subject: ${res.fields.subject}</p>
        <p>Name: ${res.fields.name}</p>
        <p>Email: ${res.fields.email}</p>
        <p>Message:</p>
        <p style="white-space: pre-wrap">${res.fields.message}</p>
        <p>This message was sent using the contact form on funkysundays.com.</p>
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
    } as SMTPTransport.Options);

    try {
        await transporter.sendMail(options);
        return Response.json({
            type: "success",
            message: "Message envoyé avec succès.",
        });
    } catch (error) {
        return Response.json({
            type: "error",
            message: "L'envoi du message à échoué.",
        });
    }
}
