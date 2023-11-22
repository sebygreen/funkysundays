import EventFull from "@/components/EventFull";
import Map from "@/components/Map";
import Schedule from "@/components/Schedule";
import Loading from "@/components/Loading";
import { fetchEvent, fetchEventSlugs, fetchCoordinates } from "@/lib/fetch";
import { Suspense } from "react";
import styles from "./page.module.css";

export default async function Event({ params }) {
    async function generateStaticParams() {
        const events = await fetchEventSlugs();
        return events.map((event) => ({
            slug: event.id,
        }));
    }
    const event = await fetchEvent(params.slug);
    const coordinates = await fetchCoordinates(event.location);
    return (
        <div
            className={`wrapper ${styles.wrapper}`}
            id="event"
        >
            <Suspense fallback={<Loading />}>
                <h1>{event.name}</h1>
                <div className="responsive">
                    <div>
                        <EventFull event={event} />
                        <Map
                            coordinates={coordinates}
                            location={event.location}
                        />
                    </div>
                    {event.schedule && (
                        <Schedule
                            multipleDays={event.multipleDays}
                            schedule={event.schedule}
                        />
                    )}
                </div>
            </Suspense>
        </div>
    );
}
