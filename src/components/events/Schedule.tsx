"use client";

import { SetBase } from "@/types";
import _ from "lodash";
import Link from "next/link";
import { ArrowRight, CaretRight, Empty } from "@phosphor-icons/react/dist/ssr";
import { Overpass } from "@/utilities/fonts";
import styles from "@/style/events/Schedule.module.css";
import { djs } from "@/utilities/tools";
import { motion } from "motion/react";
import Live from "@/components/common/Live";

const motions = {
    event: {
        hidden: {
            opacity: 0,
            scale: 0.9,
        },
        shown: {
            opacity: 1,
            scale: 1,
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

export default function Schedule({ data }: { data?: SetBase[] }) {
    const grouped = _.groupBy(data, "day");

    return (
        <motion.section
            className={styles.container}
            transition={{ staggerChildren: 0.05 }}
            initial="hidden"
            animate="shown"
        >
            {data ?
                Object.entries(grouped).map(([day, sets]) => (
                    <div key={day} className={styles.group}>
                        <div className={styles.calendar}>
                            <span>
                                <p className={styles.month}>{djs(day).format("MMM")}</p>
                                <p className={styles.day}>{djs(day).format("DD")}</p>
                            </span>
                        </div>
                        <div className="grid small">
                            {sets.map((i) => (
                                <Set key={i.id} data={i} motions={motions.event} />
                            ))}
                        </div>
                    </div>
                ))
            :   <motion.div className={styles.empty} variants={motions.event}>
                    <Empty weight="duotone" />
                    <p>Pas de lineup à montrer. </p>
                </motion.div>
            }
        </motion.section>
    );
}

function Set({ data, motions }: { data: SetBase; motions: any }) {
    return (
        <Link href={`/artists/${data.artist.id}`} className={styles.set}>
            <motion.article variants={motions}>
                {data.started && !data.ended && <Live small className={styles.started} />}
                <span>
                    <p className={styles.artist}>{data.artist.name}</p>
                    <div className={styles.range}>
                        <p className={Overpass.className}>{djs.utc(data.start).format("HH:mm")}</p>
                        <ArrowRight weight="bold" />
                        <p className={Overpass.className}>{djs.utc(data.end).format("HH:mm")}</p>
                    </div>
                </span>
                <CaretRight />
            </motion.article>
        </Link>
    );
}
