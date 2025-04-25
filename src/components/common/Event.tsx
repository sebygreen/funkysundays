import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/common/Event.module.css";
import { EventBase } from "@/types";
import { djs } from "@/utilities/tools";
import Live from "@/components/common/Live";

export default function Event({ data }: { data: EventBase }) {
    return (
        <Link href={`/events/${data.id}`} className={styles.container}>
            {data.started && !data.ended && <Live small className={styles.started} />}
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
