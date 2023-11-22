import EventFull from "@/components/events/EventFull";
import Map from "@/components/events/Map";
import Schedule from "@/components/events/Schedule";
import Loading from "@/components/layout/Loading";
import { event, eventSlugs, coordinates } from "@/lib/fetch";
import { Suspense } from "react";
import styles from "./page.module.css";

export default async function Event({ params }) {
    async function generateStaticParams() {
        const events = await eventSlugs();
        return events.map((event) => ({
            slug: event.id,
        }));
    }
    const event = await event(params.slug);
    const coordinates = await coordinates(event.location);
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
