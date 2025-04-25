"use client";

import styles from "@/style/home/Upcoming.module.css";
import Link from "next/link";
import Image from "next/image";
import { EventUpcoming } from "@/types";
import { djs } from "@/utilities/tools";
import { motion } from "framer-motion";

export default function Upcoming({ data }: { data: EventUpcoming }) {
    const motions = {
        upcoming: {
            hidden: {
                opacity: 0,
                scale: 0.95,
            },
            shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.4, ease: "backOut" },
            },
        },
    };

    return (
        <motion.div initial="hidden" animate="shown" variants={motions.upcoming} className={styles.container}>
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
