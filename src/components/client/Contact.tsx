"use client";

import styles from "@/style/Contact.module.css";
import { ArrowRight, CaretUpDown, CheckCircle, Warning } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import { ChangeEvent, FormEvent, useState } from "react";
import Loader from "@/components/Loader";
import { load } from "recaptcha-v3";
import { AnimatePresence, motion } from "framer-motion";
import { string, StringSchema, ValidationError } from "yup";
import { createToast } from "@/utilities/create";

type Toast = {
    id: string;
    type: "error" | "success" | "warning";
    message: string;
    expired: boolean;
};

export default function Contact() {
    const [pending, setPending] = useState<boolean>(false);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        subject: null,
        name: null,
        email: null,
        message: null,
    });

    const motions = {
        toast: {
            hidden: {
                opacity: 0,
                x: 10,
                transition: {
                    duration: 0.2,
                    layout: { duration: 0.1 },
                },
            },
            shown: {
                opacity: 1,
                x: 0,
                transition: {
                    duration: 0.2,
                    layout: { duration: 0.1 },
                },
            },
        },
        error: {
            hidden: {
                opacity: 0,
                y: -5,
                transition: { duration: 0.2 },
            },
            shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.2 },
            },
        },
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending(true);
        const values = new FormData(e.target as HTMLFormElement);
        try {
            const recaptcha = await load(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!);
            const token = await recaptcha.execute("contact");
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                    token: token,
                    fields: {
                        subject: values.get("subject"),
                        name: values.get("name"),
                        email: values.get("email"),
                        message: values.get("message"),
                    },
                }),
            });
            const json = await res.json();
            if (json.type === "error") {
                if (json.errors) {
                    setErrors(json.errors);
                }
            } else {
                if (errors) {
                    setErrors({
                        subject: null,
                        name: null,
                        email: null,
                        message: null,
                    });
                }
            }
            let toast = createToast(json.type, json.message);
            setToasts((previous) => [...previous, toast]);
            setTimeout(() => {
                toast.expired = true;
                setToasts((previous) => previous.filter((i) => i.id !== toast.id));
            }, 6000);
            setPending(false);
        } catch (e) {
            let toast = createToast("error", "Une erreur imprévue est survenue.");
            setToasts((previous) => [...previous, toast]);
            setTimeout(() => {
                toast.expired = true;
                setToasts((previous) => previous.filter((i) => i.id !== toast.id));
            }, 6000);
            setPending(false);
        }
    };

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

    const validation = async (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        try {
            await schemas[e.target.id].validate(e.target.value);
            if (errors[e.target.id]) {
                setErrors((previous) => ({
                    ...previous,
                    [e.target.id]: null,
                }));
            }
        } catch (error) {
            if (error instanceof ValidationError) {
                setErrors((previous) => ({
                    ...previous,
                    [e.target.id]: error.errors[0],
                }));
            }
        }
    };

    return (
        <>
            <aside className={styles.toasts}>
                <AnimatePresence>
                    {toasts.length > 0 &&
                        toasts.map((i) => (
                            <motion.article
                                layout
                                key={i.id}
                                className={`${styles.toast} ${styles[i.type]}`}
                                variants={motions.toast}
                                initial="hidden"
                                animate="shown"
                                exit="hidden"
                            >
                                {i.type === "error" || i.type === "warning" ?
                                    <Warning />
                                :   <CheckCircle />}
                                <p>{i.message}</p>
                            </motion.article>
                        ))}
                </AnimatePresence>
            </aside>
            <section>
                <div className={styles.wrapper}>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.responsive}>
                            <div className={styles.information}>
                                <div className={`${styles.input} ${errors.subject ? styles.error : undefined}`}>
                                    <div className={styles.label}>
                                        <label htmlFor="subject">Objet</label>
                                        <AnimatePresence>
                                            {errors.subject && (
                                                <motion.p
                                                    initial="hidden"
                                                    animate="shown"
                                                    exit="hidden"
                                                    variants={motions.error}
                                                >
                                                    {errors.subject}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className={styles.select}>
                                        <CaretUpDown color="currentColor" />
                                        <select name="subject" id="subject" onChange={validation}>
                                            <option value="member">Je souhaite devenir membre.</option>
                                            <option value="volunteer">Je souhaite me porter volontaire.</option>
                                            <option value="artist">Je souhaite jouer sur scène.</option>
                                            <option value="question">J&apos;ai une question.</option>
                                            <option value="feedback">Je souhaite faire une remarque.</option>
                                            <option value="other">Autre chose.</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`${styles.input} ${errors.name ? styles.error : undefined}`}>
                                    <div className={styles.label}>
                                        <label htmlFor="name">Nom</label>
                                        <AnimatePresence>
                                            {errors.name && (
                                                <motion.p
                                                    initial="hidden"
                                                    animate="shown"
                                                    exit="hidden"
                                                    variants={motions.error}
                                                >
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <input
                                        onChange={validation}
                                        type="text"
                                        placeholder="Jean Dupont"
                                        name="name"
                                        id="name"
                                    />
                                </div>
                                <div className={`${styles.input} ${errors.email ? styles.error : undefined}`}>
                                    <div className={styles.label}>
                                        <label htmlFor="email">Email</label>
                                        <AnimatePresence>
                                            {errors.email && (
                                                <motion.p
                                                    initial="hidden"
                                                    animate="shown"
                                                    exit="hidden"
                                                    variants={motions.error}
                                                >
                                                    {errors.email}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <input
                                        onChange={validation}
                                        type="text"
                                        placeholder="jean.dupont@email.com"
                                        name="email"
                                        id="email"
                                    />
                                </div>
                            </div>
                            <div className={styles.message}>
                                <div className={`${styles.input} ${errors.message ? styles.error : undefined}`}>
                                    <div className={styles.label}>
                                        <label htmlFor="message">Message</label>
                                        <AnimatePresence>
                                            {errors.message && (
                                                <motion.p
                                                    initial="hidden"
                                                    animate="shown"
                                                    exit="hidden"
                                                    variants={motions.error}
                                                >
                                                    {errors.message}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <textarea
                                        onChange={validation}
                                        placeholder="Commencez à écrire ici..."
                                        name="message"
                                        id="message"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className={styles.submit}>
                            <Button
                                type="submit"
                                text="Envoyer"
                                icon={<ArrowRight />}
                                color="primary"
                                disabled={pending}
                            />
                            {pending && <Loader />}
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
