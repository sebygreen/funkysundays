import Joi from "joi";

interface ContactForm {
    subject: string;
    name: string;
    email: string;
    message: string;
}

interface ContactFormErrors {
    subject: string | null;
    name: string | null;
    email: string | null;
    message: string | null;
}

const messages = {
    "string.base": `Ce champ est invalide.`,
    "string.min": `Ce champ est trop court.`,
    "string.empty": `Ce champ est requis.`,
    "any.required": `Ce champ est requis.`,
    "string.email": `Ce courriel est invalide.`,
    "string.max": `Ce champ est trop long.`,
    "any.only": `Cet object n'existe pas.`,
};

export const schema = Joi.object({
    subject: Joi.string().valid("member", "volunteer", "artist", "question", "privacy", "feedback", "other").required(),
    name: Joi.string().max(255).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    message: Joi.string().max(1024).required(),
}).messages(messages);

export const clientSchema = {
    subject: Joi.string()
        .valid("member", "volunteer", "artist", "question", "privacy", "feedback", "other")
        .required()
        .messages(messages),
    name: Joi.string().max(255).required().messages(messages),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages(messages),
    message: Joi.string().max(1024).required().messages(messages),
};

export function validateContact(values: ContactForm) {
    const checked = schema.validate(values, { abortEarly: false });
    if (checked.error) {
        const errors = checked.error.details;
        const grouped = errors.reduce(
            (s: ContactFormErrors, i) => {
                s[i.path[0] as keyof ContactFormErrors] = i.message;
                return s;
            },
            { subject: null, name: null, email: null, message: null },
        );
        return { ok: false, errors: grouped };
    } else {
        return { ok: true };
    }
}
