import styles from "./page.module.css";
import Button from "@/components/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import sendEmail from "@/lib/mail";

export default function Contact() {
    return (
        <div className="wrapper">
            <h1>Contact Us</h1>
            <form
                className={styles.form}
                action={sendEmail}
            >
                <label>Subject</label>
                <div className={styles.select}>
                    <select name="tag">
                        <option value="volunteer">I would like to volunteer</option>
                        <option value="artist">I would like to perform</option>
                        <option value="question">I have a question</option>
                        <option value="feedback">I have feedback</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="John Appleseed"
                    name="name"
                />
                <label>Email</label>
                <input
                    type="text"
                    placeholder="john@email.com"
                    name="email"
                />
                <label>Message</label>
                <textarea
                    rows={10}
                    placeholder="Start typing here..."
                    name="message"
                ></textarea>
                <Button
                    type="submit"
                    text="Send"
                    icon={<ArrowRight size={20} />}
                />
            </form>
        </div>
    );
}
