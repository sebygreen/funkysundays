import styles from "@/style/Upcoming.module.css";
import Event from "./Event";
import Countdown from "./client/Countdown";

export default function Upcoming({ event, countdown }) {
    return (
        <article className={styles.container}>
            <p>Événement à venir:</p>
            <Event event={event} />
            {countdown && <Countdown date={event.start.format()} />}
        </article>
    );
}
