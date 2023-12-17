"use client";

import styles from "@/style/ContactForm.module.css";
import Button from "@/components/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
export default function ContactForm() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted!");
    }

    return (
        <form className={styles.form}>
            <label>Subject</label>
            <div className={styles.select}>
                <select name="subject">
                    <option value="member">I would like to volunteer</option>
                    <option value="artist">I would like to perform</option>
                    <option value="question">I have a question</option>
                    <option value="feedback">I have feedback</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <label>Name</label>
            <input type="text" />
            <label>Email</label>
            <input type="text" />
            <label>Message</label>
            <textarea rows={10}></textarea>
            <Button
                type="submit"
                text="Send"
                icon={<ArrowRight size={20} />}
                action={(e) => handleSubmit(e)}
            />
        </form>
    );
}
