"use client";

import styles from "@/style/home/Statistics.module.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { BeerStein, CalendarCheck, Guitar, UsersFour } from "@phosphor-icons/react";
import { StatisticsBase } from "@/types";
import { clsx } from "clsx";
import { animate, motion, useInView } from "motion/react";
import { Overpass } from "@/utilities/fonts";

interface Unit {
    color: "blue" | "orange" | "green" | "pink";
    icon: ReactNode;
    text: string;
    target: number;
}

const motions = {
    unit: {
        hidden: {
            scale: 0.9,
            opacity: 0,
        },
        shown: {
            scale: 1,
            opacity: 1,
            transition: {
                opacity: {
                    type: "tween",
                    easing: "linear",
                    duration: 0.2,
                },
                scale: {
                    type: "spring",
                    duration: 0.4,
                    bounce: 0.4,
                },
            },
        },
    },
};

export default function Statistics({ data }: { data: StatisticsBase }) {
    return (
        <section className={styles.container}>
            <motion.div
                className={styles.wrapper}
                transition={{ staggerChildren: 0.1 }}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true }}
            >
                <Unit color="blue" icon={<UsersFour />} text="Spectateurs" target={data.attendees} />
                <Unit color="orange" icon={<CalendarCheck />} text="Évènements" target={data.events} />
                <Unit color="green" icon={<Guitar />} text="Artistes" target={data.artists} />
                <Unit color="pink" icon={<BeerStein />} text="Partenaires" target={data.sponsors} />
            </motion.div>
        </section>
    );
}

function Unit({ color, icon, text, target }: Unit) {
    const [counted, setCounted] = useState(false);
    const [display, setDisplay] = useState(0);
    const root = useRef<HTMLDivElement>(null);
    const visible = useInView(root);

    useEffect(() => {
        if (visible && !counted) {
            animate(0, target, {
                duration: 5,
                type: "tween",
                ease: "circOut",
                onUpdate: (latest) => setDisplay(Math.round(latest)),
                onComplete: () => setCounted(true),
            });
        }
    }, [counted, target, visible]);

    return (
        <motion.article className={clsx(styles.unit, styles[color])} ref={root} variants={motions.unit}>
            {icon}
            <div className={styles.content}>
                <h3>{display}</h3>
                <p>{text}</p>
            </div>
        </motion.article>
    );
}
