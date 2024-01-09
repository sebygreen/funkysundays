"use client";

import styles from "@/style/Contact.module.css";
import sendEmail from "@/lib/mail";
import { useFormState, useFormStatus } from "react-dom";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import { ArrowRight, CaretUpDown } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";
import { Check, Warning } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";

function Submit() {
    const { pending } = useFormStatus();
    return (
        <div className={styles.submit}>
            <Button
                type="submit"
                text="Envoyer"
                icon={<ArrowRight size={20} />}
                aria-disabled={pending}
                disabled={pending}
            />
            {pending && <Loading />}
        </div>
    );
}

function Toasts({ data }) {
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
                {data.length > 0 &&
                    data.map((i) => (
                        <motion.article
                            layout
                            key={i.id}
                            className={`${styles.toast} ${styles[i.type]}`}
                            variants={toast}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                        >
                            {i.type === "failure" ? <Warning size={22} /> : <Check size={22} />}
                            <p>{i.message}</p>
                        </motion.article>
                    ))}
            </AnimatePresence>
        </aside>
    );
}

export default function Contact() {
    const [toasts, setToasts] = useState([]);
    const [state, formAction] = useFormState(sendEmail, null);

    useEffect(() => {
        if (state && !toasts.includes(state) && !state.expired) {
            setToasts((prevState) => [...prevState, state]);
            setTimeout(() => {
                state.expired = true;
                setToasts((prevState) => prevState.filter((toast) => toast.id !== state.id));
            }, 5000);
        }
    }, [state, toasts]);

    return (
        <>
            <Toasts data={toasts} />
            <form className={styles.form} action={formAction}>
                <div className={styles.responsive}>
                    <div className={`${styles.information} spaced`}>
                        <div className={styles.input}>
                            <p>Subject</p>
                            <div className={styles.select}>
                                <CaretUpDown size={18} color="currentColor" />
                                <select name="tag" id="tag">
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
                            <input type="text" placeholder="Jean Dupont" name="name" id="name" />
                        </div>
                        <div className={styles.input}>
                            <p>Email</p>
                            <input type="text" placeholder="jean.dupont@email.com" name="email" id="email" />
                        </div>
                    </div>
                    <div className={styles.message}>
                        <div className={styles.input}>
                            <p>Message</p>
                            <textarea placeholder="Commencez à écrire ici..." name="message" id="message"></textarea>
                        </div>
                    </div>
                </div>
                <Submit />
            </form>
        </>
    );
}
