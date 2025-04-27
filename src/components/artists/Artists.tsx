"use client";

import { ArtistBase } from "@/types";
import Link from "next/link";
import { motion } from "motion/react";
import { CaretRight, Empty } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/artists/Artists.module.css";
import { User } from "@phosphor-icons/react";
import Image from "next/image";
import _ from "lodash";

const motions = {
    artist: {
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

export default function Artists({ data }: { data: ArtistBase[] }) {
    const sorted = _.groupBy(data, "sort");

    return (
        <div className={styles.wrapper}>
            <h1>Artistes</h1>
            <motion.div transition={{ staggerChildren: 0.05 }} initial="hidden" animate="shown">
                {data && data.length > 0 ?
                    Object.keys(sorted)
                        .reverse()
                        .map((key) => (
                            <section id={key.toLowerCase()} key={key} className={styles.section}>
                                <p>{key}</p>
                                <div className="grid">
                                    {sorted[key].map((artist) => (
                                        <Link key={artist.id} href={`/artists/${artist.id}`} className={styles.artist}>
                                            <motion.article variants={motions.artist}>
                                                <figure className={styles.picture}>
                                                    {artist.picture ?
                                                        <Image src={artist.picture.url} fill={true} alt={artist.name} />
                                                    :   <User />}
                                                </figure>
                                                <span className={styles.text}>
                                                    <h3>{artist.name}</h3>
                                                    <p className={styles.category}>{artist.type}</p>
                                                </span>
                                                <CaretRight className={styles.caret} size={22} />
                                            </motion.article>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))
                :   <motion.div className={styles.empty} variants={motions.artist}>
                        <Empty weight="duotone" />
                        <p>Pas d&apos;artistes à montrer. </p>
                    </motion.div>
                }
            </motion.div>
        </div>
    );
}
