"use client";

import styles from "@/style/home/Upcoming.module.css";
import Link from "next/link";
import Image from "next/image";
import { EventUpcoming } from "@/types";
import { djs } from "@/utilities/tools";
import { motion } from "motion/react";

const motions = {
    upcoming: {
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

export default function Upcoming({ data }: { data: EventUpcoming }) {
    return (
        <motion.div
            className={styles.container}
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true }}
            variants={motions.upcoming}
        >
            <Link href={`/events/${data.id}`}>
                {data.artwork && (
                    <Image
                        className={styles.artwork}
                        src={data.artwork.url}
                        alt={`Image de fond pour ${data.name}.`}
                        height={200}
                        width={400}
                    />
                )}
                <div className={styles.calendar}>
                    <p className={styles.year}>{djs(data.start).format("YYYY")}</p>
                    <span>
                        <p className={styles.month}>{djs(data.start).format("MMM")}</p>
                        <p className={styles.day}>{djs(data.start).format("DD")}</p>
                    </span>
                </div>
                <div className={styles.text}>
                    <h3>{data.name}</h3>
                    <p>{data.category}</p>
                </div>
            </Link>
        </motion.div>
    );
}
