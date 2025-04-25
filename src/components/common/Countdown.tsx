"use client";

import styles from "@/style/common/Countdown.module.css";
import { useEffect, useState } from "react";
import { animate } from "framer-motion";
import { dateDifference, djs } from "@/utilities/tools";
import { Overpass } from "@/utilities/fonts";
import { CountdownBase } from "@/types";
import Live from "@/components/common/Live";

interface Props {
    started: boolean;
    start: string;
}

export default function Countdown({ ...props }: Props) {
    const [mounted, setMounted] = useState(false);
    const [counted, setCounted] = useState(false);
    const [timer, setTimer] = useState<CountdownBase>({
        d: 0,
        h: 0,
        m: 0,
        s: 0,
    });
    const [started, setStarted] = useState<boolean>(props.started);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }
        if (started) return;
        if (!counted) {
            const target = dateDifference(props.start, true);
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
            return;
        }
        const interval = setInterval(() => {
            if (djs().utc(true).isAfter(djs(props.start))) {
                clearInterval(interval);
                setStarted(true);
            } else {
                setTimer(dateDifference(props.start));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [counted, started, mounted, props.start]);

    return (
        !started ? (
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
        ) : <Live />
    );
}
