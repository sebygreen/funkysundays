import styles from "@/style/event.module.css";

import Button from "./button";
import Calendar from "./calendar";

import { Info } from "@phosphor-icons/react/dist/ssr";

import groupBy from "@/lib/groupBy";

export default function Event({ event, artists }) {
    //console.dir(event, { depth: "full" });
    return (
        <article className={styles.event}>
            <Calendar date={event.start} />
            <span className={styles.content}>
                <h3>{event.name}</h3>
                <p className={styles.category}>{event.category}</p>
                {artists && event.schedule && (
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
                                    </div>
                                ))}
                            </div>
                        ))}
                    </section>
                )}
            </span>
            <Button
                type="route"
                url={`/events/${event.id}`}
                icon={<Info size={22} />}
            />
        </article>
    );
}
