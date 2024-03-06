import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Event.module.css";
import dayjs from "dayjs";

export default function Event({ event, alternate }) {
    return (
        <Link href={`/events/${event.id}`} className={styles.route}>
            <article
                className={alternate ? styles.alternate : styles.container}
            >
                <div className={styles.calendar}>
                    <p className={styles.year}>
                        {dayjs(event.start).format("YYYY")}
                    </p>
                    <span>
                        <p className={styles.month}>
                            {dayjs(event.start).format("MMM")}
                        </p>
                        <p className={styles.day}>
                            {dayjs(event.start).format("DD")}
                        </p>
                    </span>
                </div>
                <div className={styles.text}>
                    <h3>{event.name}</h3>
                    <p className={styles.category}>{event.category}</p>
                </div>
                <CaretRight size={22} />
            </article>
        </Link>
    );
}
