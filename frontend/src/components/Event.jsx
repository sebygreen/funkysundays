import styles from "@/style/Event.module.css";
import Button from "../layout/Button";
import Calendar from "./Calendar";
import { Info } from "@phosphor-icons/react/dist/ssr";

export default function Event({ event }) {
    //console.dir(event, { depth: "full" });
    return (
        <article className={styles.event}>
            <Calendar date={event.start} />
            <span className={styles.content}>
                <h3>{event.name}</h3>
                <p className={styles.category}>{event.category}</p>
            </span>
            <Button
                type="route"
                href={`/events/${event.id}`}
                icon={<Info size={22} />}
                text={false}
            />
        </article>
    );
}
