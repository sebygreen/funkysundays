"use client";

import styles from "@/style/Contact.module.css";
import Loader from "@/components/Loader";
import Button from "@/components/Button";
import { ArrowRight, CaretUpDown, Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function Toasts({ items }) {
    const toast = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.2,
                layout: { duration: 0.1 },
            },
        },
        hidden: {
            opacity: 0,
            x: 10,
            transition: {
                duration: 0.2,
                layout: { duration: 0.1 },
            },
        },
    };
    return (
        <aside className={styles.toasts}>
            <AnimatePresence>
                {items.length > 0 &&
                    items.map((i) => (
                        <motion.article
                            layout
                            key={i.id}
                            className={`${styles.toast} ${styles[i.type]}`}
                            variants={toast}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {i.type === "error" ? <Warning size={22} /> : <Check size={22} />}
                            <p>{i.message}</p>
                        </motion.article>
                    ))}
            </AnimatePresence>
        </aside>
    );
}

export default function Contact() {
    const [tag, setTag] = useState("volunteer");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [toasts, setToasts] = useState([]);
    const [pending, setPending] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setPending(true);
        await grecaptcha.ready(() => {
            grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
                    action: "contact",
                })
                .then(async (token) => {
                    try {
                        let res = await fetch("/api/contact", {
                            method: "POST",
                            body: JSON.stringify({
                                tag: tag,
                                name: name,
                                email: email,
                                message: message,
                                token: token,
                            }),
                        });
                        res = await res.json();
                        setPending(false);
                        setToasts((prevState) => [...prevState, res.toast]);
                        setTimeout(() => {
                            res.toast.expired = true;
                            setToasts((prevState) => prevState.filter((toast) => toast.id !== res.toast.id));
                        }, 5000);
                    } catch (e) {
                        console.error(e);
                    }
                });
        });
    }

    return (
        <>
            <Toasts items={toasts} />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.responsive}>
                    <div className={styles.information}>
                        <div className={styles.input}>
                            <p>Subject</p>
                            <div className={styles.select}>
                                <CaretUpDown size={18} color="currentColor" />
                                <select name="tag" id="tag" onChange={(e) => setTag(e.target.value)}>
                                    <option value="volunteer">Je souhaite devenir membre.</option>
                                    <option value="artist">Je souhaite jouer sur scène.</option>
                                    <option value="question">J&apos;ai une question.</option>
                                    <option value="feedback">Je souhaite faire une remarque.</option>
                                    <option value="other">Autre</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.input}>
                            <p>Nom</p>
                            <input
                                type="text"
                                placeholder="Jean Dupont"
                                name="name"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.input}>
                            <p>Email</p>
                            <input
                                type="text"
                                placeholder="jean.dupont@email.com"
                                name="email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.message}>
                        <div className={styles.input}>
                            <p>Message</p>
                            <textarea
                                placeholder="Commencez à écrire ici..."
                                name="message"
                                id="message"
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className={styles.submit}>
                    <Button
                        type="submit"
                        text="Envoyer"
                        icon={<ArrowRight size={20} />}
                        aria-disabled={pending}
                        disabled={pending}
                    />
                    {pending && <Loader />}
                </div>
            </form>
        </>
    );
}
