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
                    <option value="volunteer">I would like to volunteer</option>
                    <option value="artist">I would like to perform</option>
                    <option value="question">I have a question</option>
                    <option value="feedback">I have feedback</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                placeholder="John Appleseed"
                name="name"
                id="name"
            />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                placeholder="john@email.com"
                name="email"
                id="email"
            />
            <label htmlFor="message">Message</label>
            <textarea
                rows={10}
                placeholder="Start typing here..."
                name="message"
                id="message"
            ></textarea>
            <SubmitButton />
        </form>
    );
}
