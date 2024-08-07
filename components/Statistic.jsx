import Counter from "./client/Counter";
import styles from "@/style/Statistic.module.css";

export default function Statistic({ icon, text, number, color }) {
    return (
        <article className={styles.container}>
            <figure
                className={
                    color === "blue"
                        ? styles.blue
                        : color === "orange"
                          ? styles.orange
                          : color === "green"
                            ? styles.green
                            : color === "pink"
                              ? styles.pink
                              : undefined
                }
            >
                {icon}
            </figure>
            <div className={styles.content}>
                <p className={styles.number}>
                    <Counter number={number} />
                </p>
                <p className={styles.text}>{text}</p>
            </div>
        </article>
    );
}
