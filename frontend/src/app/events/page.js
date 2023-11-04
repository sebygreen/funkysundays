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

dayjs.extend(localizedFormat);

const pb = new PocketBase("http://127.0.0.1:8090");
async function fetchEvents() {
    function Event(event) {
        this.id = event.id; //*
        this.name = event.name; //*
        this.start = dayjs(event.start); //*
        this.end = dayjs(event.end); //*
        this.days = this.end.diff(this.start, "day") + 1;
        if (event.expand) {
            if (event.expand["schedule(event)"]) {
                this.schedule = event.expand["schedule(event)"].map((set) => ({
                    id: set.id, //*
                    start: dayjs(set.start), //*
                    end: dayjs(set.end), //*
                    day: this.start.format("LL"),
                    artistName: set.expand.artist.name, //*
                }));
            }
        }
        this.category = event.category;
    }
    const response = await pb.collection("events").getFullList({
        expand: "schedule(event).artist",
        fields: "id, name, start, end, category, poster, expand",
        sort: "-created",
    });
    const objects = response.map((event) => {
        return new Event(event);
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
            className={`wrapper ${styles.wrapper}`}
            id="events"
        >
            <h1>Events</h1>
            <Suspense fallback={<Loading />}>
                <h2>Upcoming</h2>
                <section
                    id="upcoming"
                    className={styles.archivedGrid}
                >
                    {events.upcoming.map((event) => (
                        <article
                            key={event.id}
                            className={styles.upcoming}
                        >
                            <span>
                                <h2>{event.name}</h2>
                                {event.schedule && (
                                    <section className={styles.schedule}>
                                        {Object.entries(groupBy(event.schedule, "day")).map(([day, sets]) => (
                                            <div
                                                className={styles.sets}
                                                key={day}
                                            >
                                                {sets.map((set) => (
                                                    <div
                                                        key={set.id}
                                                        className={styles.set}
                                                    >
                                                        <p>{set.artistName}</p>
                                                        <TimeBracket
                                                            start={set.start}
                                                            end={set.end}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </section>
                                )}
                            </span>
                            <span>
                                <Calendar date={event.start} />
                                <Button
                                    className={styles.button}
                                    type="route"
                                    url={`/events/${event.id}`}
                                    icon={<Info size={22} />}
                                />
                            </span>
                        </article>
                    ))}
                </section>
                <h2>Archived</h2>
                <section
                    id="archived"
                    className={styles.grid}
                >
                    {events.archived.map((event) => (
                        <article
                            key={event.id}
                            className={styles.archived}
                        >
                            <Calendar date={event.start} />
                            <span>
                                <h2>{event.name}</h2>
                                <p>{event.category}</p>
                            </span>
                            <Button
                                className={styles.button}
                                type="route"
                                url={`/events/${event.id}`}
                                icon={<Info size={22} />}
                            />
                        </article>
                    ))}
                </section>
            </Suspense>
        </div>
    );
}
