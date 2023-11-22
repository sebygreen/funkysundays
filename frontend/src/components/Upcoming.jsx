import styles from "@/style/Upcoming.module.css";
import Event from "./Event";
import dynamic from "next/dynamic";
import Countdown from "./client/Countdown";
import { Suspense } from "react";

export default function Upcoming({ event }) {
    return (
        <article className={styles.container}>
            <p className={styles.title}>Up Next</p>
            <Countdown date={event.start.format()} />
            <Event event={event} />
        </article>
    );
}
