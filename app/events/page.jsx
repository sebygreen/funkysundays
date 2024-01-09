import Event from "@/components/Event";
import Loading from "@/components/Loading";
import { Suspense } from "react";
import { event } from "@/lib/fetch";
import dayjs from "dayjs";

export const metadata = {
    title: "Évènements",
};

export default async function Events() {
    const events = await event.all();
    const upcoming = [];
    const archived = [];
    events.map((i) => {
        if (dayjs(i.start).isAfter(dayjs())) {
            upcoming.push(i);
        } else {
            archived.push(i);
        }
    });
    return (
        <div className="constrain spaced">
            <h1>Évènements</h1>
            <section id="upcoming" className="spaced">
                <h2>À Venir</h2>
                <Suspense fallback={<Loading />}>
                    {upcoming.length === 0 ? (
                        <p>Pas d&apos;évènements à montrer.</p>
                    ) : (
                        <div className="grid">
                            {upcoming.map((event) => (
                                <Event key={event.id} artists={true} event={event} />
                            ))}
                        </div>
                    )}
                </Suspense>
            </section>
            <section id="archived" className="spaced">
                <h2>Archives</h2>
                <Suspense fallback={<Loading />}>
                    {archived.length === 0 ? (
                        <p>Pas d&apos;archives à montrer.</p>
                    ) : (
                        <div className="grid">
                            {archived.map((event) => (
                                <Event key={event.id} artists={true} event={event} />
                            ))}
                        </div>
                    )}
                </Suspense>
            </section>
        </div>
    );
}
