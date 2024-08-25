"use client";

import styles from "@/style/Statistics.module.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BeerStein, CalendarCheck, Guitar, UsersFour } from "@phosphor-icons/react";
import { animate, useInView } from "framer-motion";
import { StatisticsBase } from "@/types";

interface Unit {
    color: "blue" | "orange" | "green" | "pink";
    icon: ReactNode;
    text: string;
    target: number;
}

export default function Statistics({ data }: { data: StatisticsBase }) {
    return (
        <section className={styles.container}>
            <Unit color="blue" icon={<UsersFour />} text="Spectateurs" target={data.attendees} />
            <Unit color="orange" icon={<CalendarCheck />} text="Évènements" target={data.events} />
            <Unit color="green" icon={<Guitar />} text="Artistes" target={data.artists} />
            <Unit color="pink" icon={<BeerStein />} text="Partenaires" target={data.sponsors} />
        </section>
    );
}

function Unit({ color, icon, text, target }: Unit) {
    const [counted, setCounted] = useState(false);
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref);

    useEffect(() => {
        if (!counted && isInView) {
            setCounted(true);
            animate(0, target, {
                duration: 2,
                ease: "circOut",
                onUpdate: (latest) => setDisplay(Math.round(latest)),
            });
        }
    }, [counted, target, isInView]);

    return (
        <article className={`${styles.unit} ${styles[color]}`} ref={ref}>
            {icon}
            <div className={styles.content}>
                <h3>{display}</h3>
                <p>{text}</p>
            </div>
        </article>
    );
}
