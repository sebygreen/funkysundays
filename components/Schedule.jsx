import { groupBy } from "@/lib/helpers";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import TimeBracket from "./Fourchette";
import styles from "@/style/Schedule.module.css";
import Link from "next/link";

export default function Schedule({ schedule }) {
    const sorted = groupBy(schedule, "day");
    return (
        <section className={`${styles.container} spaced`}>
            {Object.entries(sorted).map(([day, sets]) => (
                <div key={day}>
                    <p className={styles.day}>{day}</p>
                    <div className="grid small">
                        {sets.map((set) => (
                            <Set
                                key={set.id}
                                set={set}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

function Set({ set }) {
    return (
        <Link
            href={`/artists/${set.artist.id}`}
            className={styles.route}
        >
            <article
                key={set.id}
                className={styles.set}
            >
                <span>
                    <p className={styles.artist}>{set.artist.name}</p>
                    <TimeBracket
                        start={set.start}
                        end={set.end}
                    />
                </span>
                <CaretRight size={22} />
            </article>
        </Link>
    );
}
