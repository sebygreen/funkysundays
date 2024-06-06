"use client";

import Event from "@/components/Event";
import { Event as EventObject } from "@/lib/create.js";
import { useState } from "react";
import styles from "@/style/Events.module.css";
import { CaretUpDown } from "@phosphor-icons/react/dist/ssr";

export default function Events({ data }) {
    const [sort, setSort] = useState("all");
    const events = {
        upcoming: [],
        archived: [],
    };

    data = Object.keys(data).map((key) => new EventObject(data[key]));
    data.map((i) => {
        if (i.archive) {
            if (sort === "all") {
                events.archived.push(i);
            } else if (sort === "promotional" && i.category.includes("Promotion")) {
                events.archived.push(i);
            } else if (sort === "round" && i.category.includes("Funky Sunday")) {
                events.archived.push(i);
            }
        } else {
            if (sort === "all") {
                events.upcoming.push(i);
            } else if (sort === "promotional" && i.category.includes("Promotion")) {
                events.upcoming.push(i);
            } else if (sort === "round" && i.category.includes("Funky Sunday")) {
                events.upcoming.push(i);
            }
        }
    });

    function handleChange(e) {
        setSort(e.target.value);
        const displayedText = e.target.options[e.target.selectedIndex].innerText;
        const dummy = document.createElement("div");
        dummy.innerText = displayedText;
        dummy.style.position = "absolute";
        dummy.style.visibility = "hidden";
        document.body.insertBefore(dummy, document.body.firstChild);
        const measuredWidth = dummy.clientWidth;
        document.body.removeChild(dummy);
        e.target.style.width = measuredWidth + 40 + "px";
    }

    return (
        <div className={styles.wrapper}>
            <section className={styles.header}>
                <h1>Évènements</h1>
                <div className={styles.select}>
                    <CaretUpDown size={18} color="currentColor" />
                    <select name="tag" id="tag" onChange={handleChange} style={{ width: "70px" }}>
                        <option value="all">Tout</option>
                        <option value="promotional">Soirées de Promotion</option>
                        <option value="round">Les Funky Sundays</option>
                    </select>
                </div>
            </section>
            <section id="upcoming" className={styles.upcoming}>
                <h2>À Venir</h2>
                {events.upcoming.length > 0 ? (
                    <div className="grid">
                        {events.upcoming.map((event) => (
                            <Event key={event.id} artists={true} event={event} />
                        ))}
                    </div>
                ) : (
                    <p>Pas d&apos;évènements à montrer.</p>
                )}
            </section>
            <section id="archived" className={styles.archived}>
                <h2>Archives</h2>
                {events.archived.length > 0 ? (
                    <div className="grid">
                        {events.archived.toReversed().map((event) => (
                            <Event key={event.id} artists={true} event={event} />
                        ))}
                    </div>
                ) : (
                    <p>Pas d&apos;archives à montrer.</p>
                )}
            </section>
        </div>
    );
}
