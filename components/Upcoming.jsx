import Event from "./Event";
import Countdown from "./client/Countdown";
import styles from "@/style/Upcoming.module.css";
import { PaintRoller } from "@phosphor-icons/react/dist/ssr";

export default function Upcoming({ event, countdown, alternate }) {
    return (
        <article className={styles.container}>
            {countdown && <Countdown date={event ? event.start : undefined} />}
            {event ? (
                <Event event={event} alternate={alternate} />
            ) : (
                <div className={styles.empty}>
                    <p>Coming soon...</p>
                    <PaintRoller size={22} weight="duotone" />
                </div>
            )}
        </article>
    );
}
