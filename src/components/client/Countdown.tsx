"use client";

import styles from "@/style/Countdown.module.css";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { dateDifference } from "@/utilities/tools";
import { Overpass } from "@/utilities/fonts";
import { CountdownBase } from "@/types";

export default function Countdown({ start }: { start: string }) {
    const [mounted, setMounted] = useState(false);
    const [counted, setCounted] = useState(false);
    const [timer, setTimer] = useState<CountdownBase>({
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    });

    useEffect(() => {
        if (mounted) {
            if (counted) {
                setTimer(dateDifference(start));
                const interval = setInterval(() => {
                    setTimer(dateDifference(start));
                }, 1000);
                return () => clearInterval(interval);
            } else {
                setTimer(dateDifference(start, true));
                const target = dateDifference(start, true);
                Object.keys(target).map((k, n) => {
                    animate(0, target[k as keyof CountdownBase], {
                        duration: 2,
                        ease: "circOut",
                        onUpdate: (latest) =>
                            setTimer((previous) => ({
                                ...previous,
                                [k]: Math.round(latest),
                            })),
                        onComplete: () => {
                            n === Object.keys(target).length - 1 && setCounted(true);
                        },
                    });
                });
            }
        } else {
            setMounted(true);
        }
    }, [mounted, counted, start]);

    return (
        <section className={styles.container}>
            <div className={styles.unit}>
                <h3 className={Overpass.className}>{("0" + timer.d).slice(-2)}</h3>
                <p>j</p>
            </div>
            <div className={styles.unit}>
                <h3 className={Overpass.className}>{("0" + timer.h).slice(-2)}</h3>
                <p>h</p>
            </div>
            <div className={styles.unit}>
                <h3 className={Overpass.className}>{("0" + timer.m).slice(-2)}</h3>
                <p>m</p>
            </div>
            <div className={styles.unit}>
                <h3 className={Overpass.className}>{("0" + timer.s).slice(-2)}</h3>
                <p>s</p>
            </div>
        </section>
    );
}