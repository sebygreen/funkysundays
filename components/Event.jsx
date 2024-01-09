import Calendar from "./Calendar";
import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Event.module.css";

export default function Event({ event, blur }) {
    return (
        <Link
            href={`/events/${event.id}`}
            className={styles.route}
        >
            <article className={blur ? `${styles.container} blur` : styles.container}>
                <Calendar date={event.start} />
                <div className={styles.text}>
                    <h3>{event.name}</h3>
                    <p className={styles.category}>{event.category}</p>
                </div>
                <CaretRight size={22} />
            </article>
        </Link>
    );
}
