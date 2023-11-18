import { jetBrainsMono } from "@/lib/localFonts";
import Counter from "./client/Counter";
import styles from "@/style/Statistic.module.css";

export default function Statistic({ icon, text, number, color }) {
    return (
        <article className={styles.statistic}>
            <figure
                className={
                    color === "blue"
                        ? styles.blue
                        : color === "orange"
                        ? styles.orange
                        : color === "green"
                        ? styles.green
                        : undefined
                }
            >
                {icon}
            </figure>
            <div>
                <p className={styles.counter}>
                    <Counter number={number} />
                </p>
                <span className={styles.text}>{text}</span>
            </div>
        </article>
    );
}
