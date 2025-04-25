"use client";

import { ArtistBase } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { CaretRight, Empty } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/artists/Artists.module.css";
import { User } from "@phosphor-icons/react";
import Image from "next/image";
import _ from "lodash";

export default function Artists({ data }: { data: ArtistBase[] }) {
    const motions = {
        grid: {
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
    const sorted = _.groupBy(data, "sort");

    return (
        <div className={styles.wrapper}>
            <h1>Artistes</h1>
            <motion.div variants={motions.grid} initial="hidden" animate="shown">
                {data && data.length > 0 ?
                    Object.keys(sorted).reverse().map((key) => (
                        <section id={key.toLowerCase()} key={key} className={styles.section}>
                            <p>{key}</p>
                            <div className="grid">
                                {sorted[key].map((artist) => (
                                    <Link key={artist.id} href={`/artists/${artist.id}`} className={styles.artist}>
                                        <motion.article variants={motions.event}>
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
                :   <motion.div className={styles.empty} variants={motions.event}>
                        <Empty weight="duotone" />
                        <p>Pas d&apos;artistes à montrer. </p>
                    </motion.div>
                }
            </motion.div>
        </div>
    );
}
