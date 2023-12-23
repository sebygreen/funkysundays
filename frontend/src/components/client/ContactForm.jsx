"use client";

import styles from "@/style/ContactForm.module.css";
import sendEmail from "@/lib/mail";
import { useFormState } from "react-dom";
import SubmitButton from "@/components/client/SubmitButton";

const initialState = {
    message: null,
};

export default function ContactForm() {
    const [state, formAction] = useFormState(sendEmail, initialState);
    return (
        <form
            className={styles.form}
            action={formAction}
        >
            <p className="sr-only">{state?.message}</p>
            <label htmlFor="tag">Subject</label>
            <div className={styles.select}>
                <select
                    name="tag"
                    id="tag"
                >
                    <option value="volunteer">Je souhaite devenir membre</option>
                    <option value="artist">Je souhaite jouer sur scène</option>
                    <option value="question">J&apos;ai une question</option>
                    <option value="feedback">J&apos;ai du feedback</option>
                    <option value="other">Autre</option>
                </select>
            </div>
            <label htmlFor="name">Nom</label>
            <input
                type="text"
                placeholder="Jean Dupont"
                name="name"
                id="name"
            />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                placeholder="jean@email.com"
                name="email"
                id="email"
            />
            <label htmlFor="message">Message</label>
            <textarea
                rows={10}
                placeholder="Commencez à ècrire içi..."
                name="message"
                id="message"
            ></textarea>
            <SubmitButton />
        </form>
    );
}
