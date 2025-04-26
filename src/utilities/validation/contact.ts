import Joi, { PresenceMode } from "joi";

export interface ContactForm {
    subject: string;
    name: string;
    email: string;
    message: string;
}

export interface ContactFormErrors {
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

const rules = Joi.object({
    subject: Joi.string().valid("member", "volunteer", "artist", "question", "privacy", "feedback", "other"),
    name: Joi.string().max(32),
    email: Joi.string().email({ tlds: false }),
    message: Joi.string().max(1024),
}).messages(messages);

export function validateContact(values: any, presence: PresenceMode) {
    const checked = rules.validate(values, { abortEarly: false, presence });
    if (checked.error) {
        const errors = checked.error.details;
        const grouped = errors.reduce(
            (s: ContactFormErrors, i) => {
                s[i.path[0] as keyof ContactFormErrors] = i.message;
                return s;
            },
            { subject: null, name: null, email: null, message: null },
        );
        return { ok: false, values: checked.value as ContactForm, errors: grouped };
    } else {
        return { ok: true, values: checked.value as ContactForm };
    }
}
