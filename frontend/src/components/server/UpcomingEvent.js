import styles from "@/style/UpcomingEvent.module.css";
import Event from "./event";
import dynamic from "next/dynamic";
import Countdown from "../client/Countdown";
import { Suspense } from "react";

export default function UpcomingEvent({ event }) {
    //console.log(event);
    return (
        <section className={styles.upcoming}>
            <p className={styles.title}>Up Next</p>
            <Event event={event} />
            <Countdown date={event.start.format()} />
        </section>
    );
}
