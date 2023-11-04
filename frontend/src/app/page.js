import styles from "./page.module.css";
import Image from "next/image";
import logo from "@/images/logo.png";

export default function Home() {
    return (
        <div className={styles.heroBackground}>
            <div className={styles.heroTexture}></div>
            <div
                className={`wrapper ${styles.wrapper}`}
                id="home"
            >
                <section className={styles.hero}>
                    <Image
                        src={logo}
                        alt="Purple logo."
                    />
                    <h1>Making sundays a better day since 2019</h1>
                </section>
            </div>
        </div>
    );
}
