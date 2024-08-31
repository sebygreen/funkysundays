import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Event.module.css";
import { EventBase } from "@/types";
import { djs } from "@/utilities/tools";

export default function Event({ data }: { data: EventBase }) {
    const started = djs().utc(true).isAfter(djs(data.start)) && djs().utc(true).isBefore(djs(data.end));

    return (
        <Link href={`/events/${data.id}`} className={styles.container}>
            {started && (
                <div className={styles.started}>
                    <p>En Cours</p>
                    <div className={styles.dot}>
                        <div className={styles.inner} />
                        <div className={styles.outer} />
                    </div>
                </div>
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
                <ul>
                    <li>{data.category}</li>
                    {data.activity && <li>{data.activity}</li>}
                </ul>
            </div>
            <CaretRight />
        </Link>
    );
}
