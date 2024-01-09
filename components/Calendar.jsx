import dayjs from "dayjs";
import styles from "@/style/Calendar.module.css";
export default function Calendar({ date }) {
    return (
        <div className={styles.container}>
            <p className={styles.year}>{dayjs(date).format("YYYY")}</p>
            <span>
                <p className={styles.month}>{dayjs(date).format("MMM")}</p>
                <p className={styles.day}>{dayjs(date).format("DD")}</p>
            </span>
        </div>
    );
}
