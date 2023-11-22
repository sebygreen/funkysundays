"use client";

import { dateDifference } from "@/lib/helpers";
import { jetBrainsMono } from "@/lib/fonts";
import styles from "@/style/Countdown.module.css";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Loading from "@/components/Loading";

export default function Countdown({ date }) {
    const [timer, setTimer] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [mounted, setMounted] = useState(false);
    const [counted, setCounted] = useState(false);

    useEffect(() => {
        setTimer(dateDifference(date));
        setMounted(true);
        if (counted) {
            const interval = setInterval(() => {
                setTimer(dateDifference(date));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [counted]);

    return (
        <section className={styles.container}>
            <div className={mounted ? styles.active : undefined}>
                <p className={`${jetBrainsMono.className} ${styles.counter}`}>
                    {mounted && !counted ? (
                        <CountUp
                            start={0}
                            end={timer.days}
                            delay={0}
                            duration={1}
                            onEnd={() => setCounted(true)}
                        />
                    ) : mounted && counted ? (
                        <span>{timer.days}</span>
                    ) : (
                        <span>{timer.days}</span>
                    )}
                </p>{" "}
                <p className={styles.label}>d</p>
            </div>
            <div className={mounted ? styles.active : undefined}>
                <p className={`${jetBrainsMono.className} ${styles.counter}`}>
                    {mounted && !counted ? (
                        <CountUp
                            start={0}
                            end={timer.hours}
                            delay={0}
                            duration={1}
                            onEnd={() => setCounted(true)}
                        />
                    ) : mounted && counted ? (
                        <span>{timer.hours}</span>
                    ) : (
                        <span>{timer.hours}</span>
                    )}
                </p>{" "}
                <p className={styles.label}>h</p>
            </div>
            <div className={mounted ? styles.active : undefined}>
                <p className={`${jetBrainsMono.className} ${styles.counter}`}>
                    {mounted && !counted ? (
                        <CountUp
                            start={0}
                            end={timer.minutes}
                            delay={0}
                            duration={1}
                            onEnd={() => setCounted(true)}
                        />
                    ) : mounted && counted ? (
                        <span>{timer.minutes}</span>
                    ) : (
                        <span>{timer.minutes}</span>
                    )}
                </p>{" "}
                <p className={styles.label}>m</p>
            </div>
            <div className={mounted ? styles.active : undefined}>
                <p className={`${jetBrainsMono.className} ${styles.counter}`}>
                    {mounted && !counted ? (
                        <CountUp
                            start={0}
                            end={timer.seconds}
                            delay={0}
                            duration={1}
                            onEnd={() => setCounted(true)}
                        />
                    ) : mounted && counted ? (
                        <span>{timer.seconds}</span>
                    ) : (
                        <span>{timer.seconds}</span>
                    )}
                </p>
                <p className={styles.label}>s</p>
            </div>
        </section>
    );
}
