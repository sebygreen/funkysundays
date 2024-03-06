import Contact from "@/components/client/Contact";
import styles from "./page.module.css";

export const metadata = {
    title: "Contact",
};

export default function Page() {
    return (
        <main>
            <div className={styles.wrapper}>
                <h1>Contactez-nous</h1>
                <Contact />
            </div>
        </main>
    );
}
