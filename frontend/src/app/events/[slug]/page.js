import Button from "@/components/server/button";
import Loading from "@/components/server/Loading";
import TimeBracket from "@/components/server/timeBracket";
import formatTime from "@/lib/formatTime";
import groupBy from "@/lib/groupBy";

import { Calendar, Info, MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Image from "next/image";
import PocketBase from "pocketbase";
import { Suspense } from "react";

import styles from "./page.module.css";

dayjs.extend(localizedFormat);

const pb = new PocketBase("http://127.0.0.1:8090");
async function fetchEventIds() {
    const response = await pb.collection("events").getFullList({
        requestKey: "event-ids",
        fields: "id",
    });
    return response;
}
async function fetchEvent(id) {
    const response = await pb.collection("events").getOne(id, {
        requestKey: "event",
        expand: "sponsors, schedule(event).artist",
        fields: "id, collectionId, name, start, end, attendees, poster, location, expand",
    });
    function Event(event) {
        this.id = event.id; //*
        this.name = event.name; //*
        this.start = dayjs(event.start); //*
        this.end = dayjs(event.end); //*
        this.days = this.end.diff(this.start, "day") + 1;
        if (this.start.isSame(this.end, "day")) {
            this.formattedDate = `${formatTime(event.start)} — ${formatTime(event.end, "time-only")}`;
        } else {
            this.formattedDate = `${formatTime(event.start)} — ${formatTime(event.end)}`;
        }
        this.location = event.location; //*
        this.attendees = event.attendees ? event.attendees : "-";
        this.poster = `http://127.0.0.1:8090/api/files/${event.collectionId}/${this.id}/${event.poster}`; //*
        if (event.expand) {
            if (event.expand["schedule(event)"]) {
                this.schedule = event.expand["schedule(event)"].map((set) => ({
                    id: set.id, //*
                    start: dayjs(set.start), //*
                    end: dayjs(set.end), //*
                    day: this.start.format("LL"),
                    artistId: set.expand.artist.id, //*
                    artistName: set.expand.artist.name, //*
                }));
            }
            if (event.expand.sponsors) {
                this.sponsors = event.expand.sponsors.map((sponsor) => ({
                    name: sponsor.name,
                    logo: `http://127.0.0.1:8090/api/files/${sponsor.collectionId}/${sponsor.id}/${sponsor.logo}`,
                    url: sponsor.url,
                }));
            }
        }
    }
    const event = new Event(response);
    return event;
}

export default async function Page({ params }) {
    async function generateStaticParams() {
        const events = await fetchEventIds();
        return events.map((event) => ({
            slug: event.id,
        }));
    }
    const event = await fetchEvent(params.slug);
    //console.dir(event, { depth: "full" });
    return (
        <div
            className={`wrapper ${styles.wrapper}`}
            id="event"
        >
            <Suspense fallback={<Loading />}>
                <section className={styles.event}>
                    <h1>{event.name}</h1>
                    <figure className={styles.poster}>
                        <Image
                            src={event.poster}
                            alt={event.name}
                            fill={true}
                            sizes="240px"
                        />
                    </figure>
                    <ul className={styles.information}>
                        <li>
                            <Calendar
                                size={18}
                                weight="fill"
                            />
                            {event.formattedDate}
                        </li>
                        <li>
                            <MapPin
                                size={18}
                                weight="fill"
                            />
                            {event.location}
                        </li>
                        <li>
                            <UsersThree
                                size={18}
                                weight="fill"
                            />
                            {event.attendees}
                        </li>
                    </ul>
                    {event.sponsors && (
                        <div className={styles.sponsors}>
                            {event.sponsors.map((sponsor) => (
                                <a
                                    key={sponsor.id}
                                    href={sponsor.url}
                                >
                                    <Image
                                        src={sponsor.logo}
                                        fill={true}
                                        sizes="32px"
                                        alt={sponsor.name}
                                    />
                                </a>
                            ))}
                        </div>
                    )}
                </section>
                {event.schedule && (
                    <section className={styles.schedule}>
                        {Object.entries(groupBy(event.schedule, "day")).map(([day, sets]) => (
                            <div
                                className={styles.group}
                                key={day}
                            >
                                <p className={styles.title}>{day}</p>
                                <div className={styles.grid}>
                                    {sets.map((set) => (
                                        <article
                                            key={set.id}
                                            className={styles.set}
                                        >
                                            <div>
                                                <p className={styles.artist}>{set.artistName}</p>
                                                <TimeBracket
                                                    start={set.start}
                                                    end={set.end}
                                                />
                                            </div>
                                            <Button
                                                type="route"
                                                url={`/artists/${set.artistId}`}
                                                icon={<Info size={22} />}
                                            />
                                        </article>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </Suspense>
        </div>
    );
}
