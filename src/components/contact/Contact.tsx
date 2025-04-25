"use client";

import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { ToastContext } from "@/context/Toast";
import styles from "@/style/contact/Contact.module.css";
import { clientSchema } from "@/utilities/validation/contact";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useReCaptcha } from "next-recaptcha-v3";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Select from "@/components/form/Select";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";

export default function Contact() {
    const { executeRecaptcha } = useReCaptcha();
    const { newToast } = useContext(ToastContext);
    const [pending, setPending] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        subject: null,
        name: null,
        email: null,
        message: null,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending(true);
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            const token = await executeRecaptcha("contact");
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    values: Object.fromEntries(formData),
                }),
            });
            const json = await res.json();
            if (!json.ok) {
                newToast("error", json.toast);
                if (json.payload) setErrors(json.payload);
            } else {
                newToast("success", json.toast);
            }
            setPending(false);
        } catch (e) {
            newToast("error", "Une erreur imprévue est survenue.");
            setPending(false);
        }
    };

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
        const validated = clientSchema[e.target.id as "subject" | "name" | "email" | "message"].validate(
            e.target.value,
        );
        if (validated.error) {
            setErrors((previous) => ({
                ...previous,
                [e.target.id]: validated.error.message,
            }));
        } else {
            if (errors[e.target.id]) {
                setErrors((previous) => ({
                    ...previous,
                    [e.target.id]: null,
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
