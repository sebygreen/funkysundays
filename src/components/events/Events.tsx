"use client";

import { ChangeEvent, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "@/style/events/Events.module.css";
import { Calendar, CaretUpDown, Empty, Tag } from "@phosphor-icons/react/dist/ssr";
import Event from "@/components/common/Event";
import { motion } from "framer-motion";
import _ from "lodash";
import { EventBase } from "@/types";
import { djs } from "@/utilities/tools";

interface Filters {
    category: string | null;
    year: number | null;
}

interface Sorted {
    upcoming: EventBase[] | null;
    archived: EventBase[] | null;
}

export default function Events({ data }: { data: EventBase[] }) {
    const sort = useCallback((data: EventBase[], filters: Filters) => {
        filters.category && (data = data.filter((i) => i.category === filters.category));
        filters.year && (data = data.filter((i) => djs(i.start).year() === filters.year));
        let sorted: { upcoming: EventBase[]; archived: EventBase[] } = { upcoming: [], archived: [] };
        data.map((i) => {
            if (djs().utc(true).isAfter(djs(i.end))) {
                sorted.archived.push(i);
            } else {
                sorted.upcoming.push(i);
            }
        });
        return {
            upcoming: sorted.upcoming.length > 0 ? sorted.upcoming : null,
            archived: sorted.archived.length > 0 ? sorted.archived : null,
        };
    }, []);
    const [filters, setFilters] = useState<Filters>({
        category: null,
        year: null,
    });
    const [events, setEvents] = useState<Sorted | null>(sort(data, filters));

    useEffect(() => {
        if (!events) {
            const sorted: Sorted = sort(data, filters);
            if (events !== sorted) {
                setEvents(sorted);
            }
        }
    }, [events, filters, data, sort]);

    const years: ReactNode[] = [];
    for (let i = 2019; i < djs().year() + 1; i++) {
        years.push(
            <option key={i} value={i}>
                {i}
            </option>,
        );
    }

    function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
        const updated: Filters = {
            ...filters,
            category: e.target.value === "all" ? null : e.target.value,
        };
        const sorted: Sorted = sort(data, updated);
        setFilters(updated);
        if (!_.isEqual(events, sorted)) {
            setEvents(null);
        }
    }

    function handleYear(e: ChangeEvent<HTMLSelectElement>) {
        const updated: Filters = {
            ...filters,
            year: e.target.value === "all" ? null : Number(e.target.value),
        };
        const sorted: Sorted = sort(data, updated);
        setFilters(updated);
        if (!_.isEqual(events, sorted)) {
            setEvents(null);
        }
    }

    const motions = {
        container: {
            hidden: {
                transition: {
                    when: "afterChildren",
                },
            },
            shown: {
                transition: {
                    staggerChildren: 0.05,
                    when: "beforeChildren",
                },
            },
        },
        event: {
            hidden: {
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.2, ease: "backIn" },
            },
            shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.2, ease: "backOut" },
            },
        },
    };

    return (
        <>
            <section className={styles.header}>
                <div className={styles.wrapper}>
                    <h1>Évènements</h1>
                    <div className={styles.filters}>
                        <div className={styles.filter}>
                            <Tag weight="fill" />
                            <div className={styles.select}>
                                <CaretUpDown />
                                <select onChange={handleCategory} name="category" id="category">
                                    <option value="all">Tout</option>
                                    <option value="Promotion">Promotion</option>
                                    <option value="Funky Sunday">Funky Sunday</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.filter}>
                            <Calendar weight="fill" />
                            <div className={styles.select}>
                                <CaretUpDown />
                                <select onChange={handleYear} name="year" id="year">
                                    <option value="all">Tout</option>
                                    {years.map((i) => i)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {events && (
                <motion.div initial={"hidden"} animate={"shown"} variants={motions.container}>
                    {events.upcoming && (
                        <section id="upcoming" className={styles.upcoming}>
                            <div className={styles.wrapper}>
                                <h2>À Venir</h2>
                                <div className="grid">
                                    {events.upcoming.map((i) => (
                                        <motion.div key={i.id} variants={motions.event}>
                                            <Event data={i} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    {events.archived && (
                        <section id="archived" className={styles.archived}>
                            <div className={styles.wrapper}>
                                <h2>Archives</h2>
                                <div className="grid">
                                    {events.archived.toReversed().map((i) => (
                                        <motion.div key={i.id} variants={motions.event}>
                                            <Event data={i} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                    {!events.upcoming && !events.archived && (
                        <div className={styles.wrapper}>
                            <motion.section key={"empty"} className={styles.empty} variants={motions.event}>
                                <Empty weight="duotone" />
                                <p>Pas d&apos;évènements à montrer. </p>
                            </motion.section>
                        </div>
                    )}
                </motion.div>
            )}
        </>
    );
}
