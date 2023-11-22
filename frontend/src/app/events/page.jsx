import Event from "@/components/events/Event";
import Loading from "@/components/layout/Loading";
import { Suspense } from "react";
import styles from "./page.module.css";
import { events } from "@/lib/fetch";

export default async function Events() {
    const events = await events();
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
                    className="grid"
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
                    className="grid"
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
