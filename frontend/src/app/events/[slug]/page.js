import Loading from "@/components/Loading";
import Schedule from "@/components/Schedule";
import Mapbox from "@/components/client/Mapbox";
import appleMaps from "@/images/apple-maps.png";
import googleMaps from "@/images/google-maps.png";
import { CalendarCheck, CalendarX, MapPin, Tag, UsersThree } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Image from "next/image";
import PocketBase from "pocketbase";
import { Suspense } from "react";
import styles from "./page.module.css";

const pb = new PocketBase("http://127.0.0.1:8090");
dayjs.extend(localizedFormat);

async function fetchCoordinates(query) {
    try {
        const data = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ch&limit=3&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
        );
        const json = await data.json();
        //success
        const coordinates = {
            longitude: json.features[0].center[0],
            latitude: json.features[0].center[1],
        };
        return coordinates;
    } catch (err) {
        //failure
        console.log(err);
        return false;
    }
}
async function fetchEventIds() {
    const data = await pb.collection("events").getFullList({
        requestKey: "event-ids",
        fields: "id",
    });
    return data;
}
async function fetchEvent(id) {
    const data = await pb.collection("events").getOne(id, {
        requestKey: "event",
        expand: "sponsors, schedule(event).artist",
        fields: "id, collectionId, name, start, end, category, attendees, poster, location, expand.sponsors.id, expand.sponsors.collectionId, expand.sponsors.name, expand.sponsors.logo, expand.sponsors.url, expand.schedule(event).id, expand.schedule(event).start, expand.schedule(event).end, expand.schedule(event).expand.artist.id, expand.schedule(event).expand.artist.name",
    });
    function Sponsor(sponsor) {
        //id, collectionId, name, logo, url
        this.name = sponsor.name;
        this.logo = `http://127.0.0.1:8090/api/files/${sponsor.collectionId}/${sponsor.id}/${sponsor.logo}`;
        this.url = sponsor.url;
    }
    function Set(set) {
        //id, start, end, artist.id, artist.name
        this.id = set.id; //*
        this.start = dayjs(set.start); //*
        this.end = dayjs(set.end); //*
        this.day = this.start.format("LL");
        this.artist = {
            id: set.expand.artist.id, //*
            name: set.expand.artist.name, //*
        };
    }
    function Event(event) {
        this.id = event.id; //*
        this.name = event.name; //*
        this.start = dayjs(event.start); //*
        this.end = dayjs(event.end); //*
        this.multipleDays = this.end.isAfter(this.start, "day");
        this.location = event.location; //*
        this.category = event.category; //*
        this.attendees = event.attendees ? event.attendees : "-";
        this.poster = `http://127.0.0.1:8090/api/files/${event.collectionId}/${this.id}/${event.poster}`; //*
        if (event.expand) {
            if (event.expand.sponsors) {
                this.sponsors = event.expand.sponsors.map((sponsor) => new Sponsor(sponsor));
            }
            if (event.expand["schedule(event)"]) {
                this.schedule = event.expand["schedule(event)"].map((set) => new Set(set));
            }
        }
    }
    const event = new Event(data);
    //console.dir(event, { depth: "full" });
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
    const coordinates = await fetchCoordinates(event.location);
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
                        {event.multipleDays ? (
                            <>
                                <li>
                                    <CalendarCheck
                                        size={18}
                                        weight="fill"
                                    />
                                    {event.start.format("LL HH:mm")}
                                </li>
                                <li>
                                    <CalendarX
                                        size={18}
                                        weight="fill"
                                    />
                                    {event.end.format("LL HH:mm")}
                                </li>
                            </>
                        ) : (
                            <li>
                                <CalendarCheck
                                    size={18}
                                    weight="fill"
                                />
                                {event.start.format("LL HH:mm")} - {event.end.format("HH:mm")}
                            </li>
                        )}
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
                        <li>
                            <Tag
                                size={18}
                                weight="fill"
                            />
                            {event.category}
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
                    <Schedule
                        multipleDays={event.multipleDays}
                        schedule={event.schedule}
                    />
                )}
                <section className={styles.map}>
                    <Mapbox coordinates={coordinates} />
                    <div className={styles.buttons}>
                        <a href={`http://maps.apple.com/?q=${event.location}`}>
                            <Image
                                src={appleMaps}
                                alt="Apple maps icon."
                            />
                            <span>Apple Maps</span>
                        </a>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${event.location}`}>
                            <Image
                                src={googleMaps}
                                alt="Google maps icon."
                            />
                            <span>Google Maps</span>
                        </a>
                    </div>
                </section>
            </Suspense>
        </div>
    );
}
