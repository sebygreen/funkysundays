import styles from "./page.module.css";
import Contact from "@/components/contact/Contact";

export default function Page() {
    return (
        <>
            <section className={styles.header}>
                <div className={styles.wrapper}>
                    <h1>Contact</h1>
                </div>
            </section>
            <section className={styles.form}>
                <div className={styles.wrapper}>
                    <Contact />
                </div>
            </section>
        </>
    )
}
