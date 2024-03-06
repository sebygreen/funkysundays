import dayjs from "dayjs";
import styles from "@/style/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.wrapper}>
                <a href="/legal" className="small">
                    Mentions légales
                </a>
                <p>&copy; funkysundays.com {dayjs().year()}</p>
            </div>
        </footer>
    );
}
