import styles from "@/style/Upcoming.module.css";
import Event from "./Event";
import Countdown from "./client/Countdown";

export default function Upcoming({event}) {
    return (
        <article className={styles.container}>
            <p className={styles.title}>Up Next</p>
            <Event event={event}/>
            <Countdown date={event.start.format()}/>
        </article>
    );
}
