"use server";
import nodemailer from "nodemailer";
export default async function sendEmail(formData) {
    const values = {
        tag: formData.get("tag"),
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
    };
    const options = {
        from: process.env.NODEMAILER_USERNAME,
        to: "nathaliemagreen@gmail.com",
        subject: `Message from ${values.email}`,
        html: `
        <p>Tag: ${values.tag}</p>
        <p>Name: ${values.name}</p>
        <p>Email: ${values.email}</p>
        <p>Message: ${values.message}</p>
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
    } catch (error) {
        console.error(error);
    }
}
