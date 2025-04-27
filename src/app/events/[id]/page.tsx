import { fetchPlace } from "@/utilities/fetch/providers";
import styles from "./page.module.css";
import Image from "next/image";
import {
    ArrowSquareOut,
    Calendar,
    CameraSlash,
    MapPin,
    MusicNote,
    Tag,
    UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { PartnerBase } from "@/types";
import Schedule from "@/components/events/Schedule";
import Mapbox from "@/components/events/Mapbox";
import Button from "@/components/common/Button";
import { djs, scaleLogo } from "@/utilities/tools";
import { Metadata } from "next";
import Countdown from "@/components/common/Countdown";
import { fetchEvent, fetchEvents } from "@/utilities/fetch/events";

export async function generateStaticParams() {
    const data = await fetchEvents();
    return data.map((i) => ({ id: i.id }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const id = params.id;
    const event = await fetchEvent(id);
    return { title: `Évènements • ${event.name}` };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const data = await fetchEvent(params.id);
    const place = !data.ended && data.location ? await fetchPlace(data.location) : undefined;

    return (
        <>
            <section className={styles.header}>
                <div className={styles.wrapper}>
                    <h1>{data.name}</h1>
                    {data.ended ?
                        <p className={styles.archived}>Archive</p>
                    :   <Countdown start={data.start} started={data.started} />}
                </div>
            </section>
            <div className={styles.responsive}>
                <div className={styles.wrapper}>
                    <section className={styles.metadata}>
                        <figure className={styles.poster}>
                            {data.poster ?
                                <Image src={data.poster.url} alt={data.name} fill sizes="240px" />
                            :   <CameraSlash />}
                        </figure>
                        <ul className={styles.information}>
                            <li key={"date"}>
                                <Calendar weight="fill" />
                                {data.days ?
                                    <span>
                                        {djs.utc(data.start).format("LL - HH:mm")}
                                        <br />
                                        {djs.utc(data.end).format("LL - HH:mm")}
                                    </span>
                                :   <span>
                                        {djs.utc(data.start).format("LL HH:mm")} - {djs.utc(data.end).format("HH:mm")}
                                    </span>
                                }
                            </li>
                            <li key={"category"}>
                                <Tag weight="fill" />
                                {data.category}
                            </li>
                            <li key={"activity"}>
                                <MusicNote weight="fill" />
                                {data.activity ? data.activity : "N/A"}
                            </li>
                            <li key={"location"}>
                                <MapPin weight="fill" />
                                {place ? place.properties.full_address : "N/A"}
                            </li>
                            <li key={"attendees"}>
                                <UsersThree weight="fill" />
                                {data.attendees ? data.attendees : "N/A"}
                            </li>
                        </ul>
                    </section>
                    <Schedule data={data.schedule} />
                </div>
            </div>
            {data.sponsors && (
                <section className={styles.collaborations}>
                    <div className={styles.wrapper}>
                        <div className={styles.partners}>
                            {data.sponsors.map((i) => (
                                <Partner key={i.id} data={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {!data.ended && data.location && (
                <section className={styles.map}>
                    <div className={styles.wrapper}>
                        <Mapbox coordinates={data.location} />
                        <div className={styles.buttons}>
                            <Button
                                type="anchor"
                                color="primary"
                                url={`https://maps.apple.com/?q=${place.properties.full_address}`}
                                icon={<ArrowSquareOut weight="fill" />}
                                text="Apple Maps"
                            />
                            <Button
                                type="anchor"
                                color="primary"
                                url={`https://www.google.com/maps/search/?api=1&query=${place.properties.full_address}`}
                                icon={<ArrowSquareOut weight="fill" />}
                                text="Google Maps"
                            />
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

function Partner({ data }: { data: PartnerBase }) {
    const scaled = scaleLogo(data.logo.height!, data.logo.width!);
    return data.url ?
            <a key={data.id} target="_blank" href={data.url}>
                <figure key={data.id} className={styles.partner}>
                    <Image src={data.logo.url} width={scaled.width} height={scaled.height} alt={data.name} />
                </figure>
            </a>
        :   <figure key={data.id} className={styles.partner}>
                <Image src={data.logo.url} width={scaled.width} height={scaled.height} alt={data.name} />
            </figure>;
}
