import Map from "@/components/Map";
import Schedule from "@/components/Schedule";
import Loading from "@/components/Loading";
import { event, mapbox } from "@/lib/fetch";
import { Suspense } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Calendar, MapPin, Tag, UsersThree } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import Collaborations from "@/components/Collaborations";

export const revalidate = 300;

export const metadata = {
    title: "Évènements",
};

export default async function Page({ params }) {
    async function generateStaticParams() {
        const data = await event.slugs();
        return data.map((i) => ({
            slug: i.id,
        }));
    }
    const data = await event.one(params.slug, true);
    let places = await mapbox.geocoding(data.location);
    return (
        <div className="constrain spaced">
            <Suspense fallback={<Loading />}>
                <div className={styles.responsive}>
                    <section className={styles.metadata}>
                        {dayjs(data.end).isBefore(dayjs()) ? (
                            <div className={styles.header}>
                                <h1 className="nowrap">{data.name}</h1>
                                {dayjs(data.end).isBefore(dayjs()) && <p className={styles.archived}>Archive</p>}
                            </div>
                        ) : (
                            <h1>{data.name}</h1>
                        )}
                        {data.poster && (
                            <figure className={styles.poster}>
                                <Image src={data.poster} alt={data.name} fill={true} sizes="240px" />
                            </figure>
                        )}
                        <ul className={styles.information}>
                            <li className="nowrap" key={"category"}>
                                <Tag size={16} weight="fill" />
                                {data.category}
                            </li>
                            <li className="nowrap" key={"date"}>
                                <Calendar size={16} weight="fill" />
                                {data.multi ? (
                                    <span>
                                        {dayjs(data.start).format("LL - HH:mm")}
                                        <br />
                                        {dayjs(data.end).format("LL - HH:mm")}
                                    </span>
                                ) : (
                                    <span>
                                        {dayjs(data.start).format("LL HH:mm")} - {dayjs(data.end).format("HH:mm")}
                                    </span>
                                )}
                            </li>
                            <li className="nowrap" key={"location"}>
                                <MapPin size={16} weight="fill" />
                                {data.location}
                            </li>
                            <li className="nowrap" key={"attendees"}>
                                <UsersThree size={16} weight="fill" />
                                {data.attendees}
                            </li>
                        </ul>
                        {data.partners && <Collaborations items={data.partners} />}
                        {data.sponsors && <Collaborations items={data.sponsors} type={"sponsors"} />}
                    </section>
                    {data.schedule && <Schedule multi={data.multi} schedule={data.schedule} />}
                </div>
                {places.features.length !== 0 && (
                    <Map coordinates={places.features[0].center} location={places.features[0].text} />
                )}
            </Suspense>
        </div>
    );
}
