import Image from "next/image";
import { Calendar, UsersThree, MapPin, Tag } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/EventFull.module.css";
import Sponsors from "./Sponsors";

export default function EventFull({ event }) {
    return (
        <section className={styles.container}>
            <figure className={styles.poster}>
                <Image
                    src={event.poster}
                    alt={event.name}
                    fill={true}
                    sizes="240px"
                />
            </figure>
            <div>
                <ul className={styles.information}>
                    <li>
                        <Calendar
                            size={18}
                            weight="fill"
                        />
                        {event.multipleDays ? (
                            <span>
                                {event.start.format("LL - HH:mm")}
                                <br />
                                {event.end.format("LL - HH:mm")}
                            </span>
                        ) : (
                            <span>
                                {event.start.format("LL HH:mm")} - {event.end.format("HH:mm")}
                            </span>
                        )}
                    </li>
                    <li>
                        <MapPin
                            size={18}
                            weight="fill"
                        />
                        {event.location}
                    </li>
                    <li>
                        <UsersThree
                            size={18}
                            weight="fill"
                        />
                        {event.attendees}
                    </li>
                    <li>
                        <Tag
                            size={18}
                            weight="fill"
                        />
                        {event.category}
                    </li>
                </ul>
                {event.sponsors && <Sponsors sponsors={event.sponsors} />}
            </div>
        </section>
    );
}
