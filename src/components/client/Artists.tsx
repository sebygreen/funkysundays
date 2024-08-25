"use client";

import { ArtistBase } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { CaretRight, Empty } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Artists.module.css";
import { User } from "@phosphor-icons/react";
import Image from "next/image";

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

    return (
        <div className={styles.wrapper}>
            <h1>Artistes</h1>
            <motion.div className="grid" variants={motions.grid} initial="hidden" animate="shown">
                {data ?
                    data.map((i) => (
                        <Link key={i.id} href={`/artists/${i.id}`} className={styles.artist}>
                            <motion.article variants={motions.event}>
                                <figure className={styles.picture}>
                                    {i.picture ?
                                        <Image src={i.picture} fill={true} alt={i.name} />
                                    :   <User />}
                                </figure>
                                <span className={styles.text}>
                                    <h3>{i.name}</h3>
                                    <p className={styles.category}>{i.type}</p>
                                </span>
                                <CaretRight className={styles.caret} size={22} />
                            </motion.article>
                        </Link>
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
