import Map from "@/components/Map";
import Schedule from "@/components/Schedule";
import { event, mapbox } from "@/lib/fetch";
import styles from "./page.module.css";
import Image from "next/image";
import {
    Calendar,
    CalendarX,
    CameraSlash,
    MapPin,
    Tag,
    UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import Collaborations from "@/components/Collaborations";

export const revalidate = 300; //5 minutes

export const metadata = {
    title: "Évènements",
};

export default async function Page({ params }) {
    async function generateStaticParams() {
        const data = await event.all();
        return data.map((i) => ({
            slug: i.id,
        }));
    }

    let places;
    const data = await event.one(params.slug);
    if (!data.archive) {
        places = await mapbox.geocoding(data.location);
    }

    return (
        <main>
            <section>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h1>{data.name}</h1>
                        {data.archive && (
                            <p className={styles.archived}>Archive</p>
                        )}
                    </div>
                </div>
            </section>
            <div className={styles.responsive}>
                <section className={styles.metadata}>
                    <div className={styles.flex}>
                        <figure className={styles.poster}>
                            {data.poster ? (
                                <Image
                                    src={data.poster}
                                    alt={data.name}
                                    fill={true}
                                    sizes="240px"
                                />
                            ) : (
                                <CameraSlash
                                    size={64}
                                    color="var(--opaque-pink)"
                                />
                            )}
                        </figure>
                        <ul className={styles.information}>
                            <li key={"category"}>
                                <Tag size={16} weight="fill" />
                                {data.category}
                            </li>
                            <li key={"date"}>
                                <Calendar size={16} weight="fill" />
                                {data.multi ? (
                                    <span>
                                        {dayjs(data.start).format("LL - HH:mm")}
                                        <br />
                                        {dayjs(data.end).format("LL - HH:mm")}
                                    </span>
                                ) : (
                                    <span>
                                        {dayjs(data.start).format("LL HH:mm")} -{" "}
                                        {dayjs(data.end).format("HH:mm")}
                                    </span>
                                )}
                            </li>
                            <li key={"location"}>
                                <MapPin size={16} weight="fill" />
                                {data.location}
                            </li>
                            <li key={"attendees"}>
                                <UsersThree size={16} weight="fill" />
                                {data.attendees}
                            </li>
                        </ul>
                    </div>
                    {(data.partners || data.sponsors) && (
                        <div className={styles.collaborations}>
                            {data.partners && (
                                <Collaborations items={data.partners} />
                            )}
                            {data.sponsors && (
                                <Collaborations
                                    items={data.sponsors}
                                    type="sponsors"
                                />
                            )}
                        </div>
                    )}
                </section>
                <section className={styles.timetable}>
                    <h2>Lineup</h2>
                    {data.schedule ? (
                        <Schedule multi={data.multi} schedule={data.schedule} />
                    ) : (
                        <div className={styles.empty}>
                            <CalendarX size={64} />
                        </div>
                    )}
                </section>
            </div>
            {places && places.features.length > 0 && (
                <section>
                    <div className={styles.wrapper}>
                        <Map
                            coordinates={places.features[0].center}
                            location={places.features[0].text}
                        />
                    </div>
                </section>
            )}
        </main>
    );
}
