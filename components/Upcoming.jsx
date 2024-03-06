import Event from "./Event";
import Countdown from "./client/Countdown";
import styles from "@/style/Upcoming.module.css";

export default function Upcoming({ event, countdown, alternate }) {
    console.log(event);
    if (event) {
        return (
            <article className={styles.container}>
                {countdown && <Countdown date={event.start} />}
                <Event event={event} alternate={alternate} />
            </article>
        );
    } else {
        return (
            <article className={styles.container}>
                {countdown && <Countdown />}
                <p className={styles.empty}>Coming soon.</p>
            </article>
        );
    }
}
