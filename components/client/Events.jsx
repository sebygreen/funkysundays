"use client";

import Event from "@/components/Event";
import { useState } from "react";
import dayjs from "dayjs";
import styles from "@/style/Events.module.css";
import { CaretUpDown } from "@phosphor-icons/react/dist/ssr";

export default function Events({ data }) {
    const [sort, setSort] = useState("Tout");

    data = Object.keys(data).map((key) => data[key]);
    const events = {
        upcoming: [],
        archived: [],
    };
    data.map((i) => {
        if (dayjs(i.start).isAfter(dayjs())) {
            if (sort === "Soirée de Promotion" && i.category === sort) {
                events.upcoming.push(i);
            } else if (sort === "Un Funky Sunday" && i.category === sort) {
                events.upcoming.push(i);
            } else if (sort === "Tout") {
                events.upcoming.push(i);
            }
        } else {
            if (sort === "Soirée de Promotion" && i.category === sort) {
                events.archived.push(i);
            } else if (sort === "Un Funky Sunday" && i.category === sort) {
                events.archived.push(i);
            } else if (sort === "Tout") {
                events.archived.push(i);
            }
        }
    });

    function handleChange(e) {
        setSort(e.target.value);
        const displayedText =
            e.target.options[e.target.selectedIndex].innerText;
        const dummy = document.createElement("div");
        dummy.innerText = displayedText;
        dummy.style.position = "absolute";
        dummy.style.visibility = "hidden";
        document.body.insertBefore(dummy, document.body.firstChild);
        const measuredWidth = dummy.clientWidth;
        document.body.removeChild(dummy);
        e.target.style.width = measuredWidth + 50 + "px";
    }

    return (
        <>
            <section className={styles.header}>
                <h1>Évènements</h1>
                <div className={styles.select}>
                    <CaretUpDown size={18} color="currentColor" />
                    <select
                        name="tag"
                        id="tag"
                        onChange={handleChange}
                        style={{ width: "80px" }}
                    >
                        <option value="Tout">Tout</option>
                        <option value="Soirée de Promotion">
                            Soirées de Promotion
                        </option>
                        <option value="Un Funky Sunday">
                            Les Funky Sundays
                        </option>
                    </select>
                </div>
            </section>
            <section id="upcoming" className="spaced">
                <h2>À Venir</h2>
                {events.upcoming.length === 0 ? (
                    <p>Pas d&apos;évènements à montrer.</p>
                ) : (
                    <div className="grid">
                        {events.upcoming.map((event) => (
                            <Event
                                key={event.id}
                                artists={true}
                                event={event}
                            />
                        ))}
                    </div>
                )}
            </section>
            <section id="archived" className="spaced">
                <h2>Archives</h2>
                {events.archived.length === 0 ? (
                    <p>Pas d&apos;archives à montrer.</p>
                ) : (
                    <div className="grid">
                        {events.archived.toReversed().map((event) => (
                            <Event
                                key={event.id}
                                artists={true}
                                event={event}
                            />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
