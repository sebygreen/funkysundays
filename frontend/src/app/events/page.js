import Button from "@/components/server/button";
import Loading from "@/components/server/loading";
import TimeBracket from "@/components/server/timeBracket";
import groupBy from "@/lib/groupBy";

import { Info } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import PocketBase from "pocketbase";
import { Suspense } from "react";

import styles from "./page.module.css";
import Calendar from "@/components/server/calendar";
import Event from "@/components/server/event";
import EventSchema from "@/schemas/eventSchema";

dayjs.extend(localizedFormat);

const pb = new PocketBase("http://127.0.0.1:8090");
async function fetchEvents() {
    const response = await pb.collection("events").getFullList({
        expand: "schedule(event).artist",
        fields: "id, name, start, end, category, poster, expand",
        sort: "-start",
    });
    const objects = response.map((event) => {
        return new EventSchema(event);
    });
    const events = {
        upcoming: [],
        archived: [],
    };
    objects.map((event) => {
        if (event.start.isAfter(dayjs())) {
            events.upcoming.push(event);
        } else {
            events.archived.push(event);
        }
    });
    return events;
}

export default async function Page() {
    const events = await fetchEvents();
    //console.dir(events, { depth: "full" });
    return (
        <div
            className={`${styles.wrapper} wrapper`}
            id="events"
        >
            <h1>Events</h1>
            <Suspense fallback={<Loading />}>
                <h2>Upcoming</h2>
                <section
                    id="upcoming"
                    className={styles.grid}
                >
                    {events.upcoming.length === 0 ? (
                        <p>No upcoming events for now.</p>
                    ) : (
                        events.upcoming.map((event) => (
                            <Event
                                key={event.id}
                                artists={true}
                                event={event}
                            />
                        ))
                    )}
                </section>
                <h2>Archived</h2>
                <section
                    id="archived"
                    className={styles.grid}
                >
                    {events.archived.map((event) => (
                        <Event
                            key={event.id}
                            artists={false}
                            event={event}
                        />
                    ))}
                </section>
            </Suspense>
        </div>
    );
}
