import styles from "./page.module.css";
import Contact from "@/components/client/Contact";

export default function Page() {
    return (
        <main>
            <section>
                <div className={styles.wrapper}>
                    <h1>Contact</h1>
                </div>
            </section>
            <Contact />
        </main>
    )
}
