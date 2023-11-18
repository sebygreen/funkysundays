import groupBy from "@/lib/groupBy";
import styles from "@/style/Schedule.module.css";
import { Info } from "@phosphor-icons/react/dist/ssr";
import Button from "./Button";
import TimeBracket from "./TimeBracket";

export default function Schedule({ multipleDays, schedule }) {
    if (multipleDays) {
        //console.log("multi-day event");
        const groupedSchedule = groupBy(schedule, "day");
        return (
            <section className={styles.container}>
                {Object.entries(groupedSchedule).map(([day, sets]) => (
                    <div
                        key={day}
                        className={styles.group}
                    >
                        <p className={styles.day}>{day}</p>
                        <div className={styles.grid}>
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
    } else {
        //console.log("single day event");
        return (
            <section className={styles.container}>
                <div className={styles.grid}>
                    {schedule.map((set) => (
                        <Set
                            key={set.id}
                            set={set}
                        />
                    ))}
                </div>
            </section>
        );
    }
}

function Set({ set }) {
    return (
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
            <Button
                type="route"
                url={`/artists/${set.artist.id}`}
                icon={<Info size={22} />}
            />
        </article>
    );
}
