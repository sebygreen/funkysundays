import styles from "@/style/Calendar.module.css";
export default function Calendar({ date }) {
    return (
        <div className={styles.calendar}>
            <p className={styles.year}>{date.format("YYYY")}</p>
            <span>
                <p className={styles.month}>{date.format("MMM")}</p>
                <p className={styles.day}>{date.format("DD")}</p>
            </span>
        </div>
    );
}
