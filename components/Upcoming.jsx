import Event from "./Event";
import Countdown from "./client/Countdown";
import styles from "@/style/Upcoming.module.css";

export default function Upcoming({ event, countdown }) {
    return (
        <section className={styles.container}>
            <p className={styles.text}>Prochaine édition dans</p>
            {countdown && <Countdown date={event.start} />}
            <Event event={event} blur />
        </section>
    );
}
