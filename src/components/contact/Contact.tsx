"use client";

import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { useToast } from "@/context/Toast";
import styles from "@/style/contact/Contact.module.css";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useReCaptcha } from "next-recaptcha-v3";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import Select from "@/components/form/Select";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import { ContactFormErrors, validateContact } from "@/utilities/validation/contact";
import { contact } from "@/actions/contact";

export default function Contact() {
    const { executeRecaptcha } = useReCaptcha();
    const { newToast } = useToast();
    const [pending, dispatch] = useTransition();
    const [errors, setErrors] = useState<ContactFormErrors>({
        subject: null,
        name: null,
        email: null,
        message: null,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        dispatch(async () => {
            try {
                const token = await executeRecaptcha("contact");
                const res = await contact(formData, token);
                if (!res.ok) {
                    newToast("error", res.toast);
                    if (res.payload) setErrors(res.payload);
                } else {
                    newToast("success", res.toast);
                }
            } catch (e) {
                newToast("error", "Une erreur est survenue.");
            }
        });
    };

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const checked = validateContact({ [e.target.name]: e.target.value }, "optional");
        if (!checked.ok && checked.errors) {
            setErrors((previous) => ({
                ...previous,
                [e.target.name]: checked.errors[e.target.name as keyof ContactFormErrors],
            }));
        } else {
            if (errors[e.target.name as keyof ContactFormErrors]) {
                setErrors((previous) => ({
                    ...previous,
                    [e.target.name]: null,
                }));
            }
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.responsive}>
                <div className={styles.information}>
                    <Select
                        name="subject"
                        label="Objet"
                        error={errors.subject}
                        onChange={handleChange}
                        options={[
                            {
                                value: "member",
                                label: "Je souhaite devenir membre.",
                            },
                            {
                                value: "volunteer",
                                label: "Je souhaite me porter volontaire.",
                            },
                            {
                                value: "artist",
                                label: "Je souhaite jouer sur scène.",
                            },
                            {
                                value: "question",
                                label: "J'ai une question.",
                            },
                            {
                                value: "privacy",
                                label: "Appliquer mes droits à l'image.",
                            },
                            {
                                value: "feedback",
                                label: "Je souhaite faire une remarque.",
                            },
                            {
                                value: "other",
                                label: "Autre chose.",
                            },
                        ]}
                    />
                    <Input
                        type="text"
                        name="name"
                        label="Nom"
                        placeholder="Jean Dupont"
                        error={errors.name}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="jean.dupont@email.com"
                        error={errors.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.message}>
                    <Textarea
                        placeholder="Commencez à écrire ici..."
                        name="message"
                        label="Message"
                        error={errors.message}
                        className={styles.group}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={styles.submit}>
                <Button type="submit" text="Envoyer" icon={<ArrowRight />} color="primary" disabled={pending} />
                {pending && <Loader />}
            </div>
        </form>
    );
}
