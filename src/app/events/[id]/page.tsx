import { fetchArtistName, fetchEvent, fetchEventIds, fetchEventName, fetchPlace } from "@/utilities/fetch";
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
import Schedule from "@/components/client/Schedule";
import Mapbox from "@/components/client/Mapbox";
import Button from "@/components/Button";
import { djs } from "@/utilities/tools";
import { Metadata } from "next";

export const revalidate = 30;

export async function generateStaticParams() {
    const data = await fetchEventIds();
    return data.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const id = params.id;
    const event = await fetchEventName(id);
    return {
        title: `Évènements • ${event.name}`,
    };
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await fetchEvent(params.id);
    const place = !data.archive && data.location ? await fetchPlace(data.location) : undefined;

    return (
        <main>
            <section className={styles.header}>
                <div className={styles.wrapper}>
                    <h1>{data.name}</h1>
                    {data.archive && <p className={styles.archived}>Archive</p>}
                </div>
            </section>
            <div className={styles.responsive}>
                <div className={styles.wrapper}>
                    <section className={styles.metadata}>
                        <figure className={styles.poster}>
                            {data.poster ?
                                <Image src={data.poster.url} alt={data.name} fill={true} sizes="240px" />
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
                                {data.location ? data.location : "N/A"}
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
            {place && (
                <section className={styles.map}>
                    <div className={styles.wrapper}>
                        <Mapbox coordinates={place.center} />
                        <div className={styles.buttons}>
                            <Button
                                type="anchor"
                                color="primary"
                                href={`https://maps.apple.com/?q=${place.place_name_fr}`}
                                icon={<ArrowSquareOut size={20} weight="fill" />}
                                text="Apple Maps"
                            />
                            <Button
                                type="anchor"
                                color="primary"
                                href={`https://www.google.com/maps/search/?api=1&query=${place.place_name_fr}`}
                                icon={<ArrowSquareOut size={20} weight="fill" />}
                                text="Google Maps"
                            />
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

const scaleLogo = (height: number, width: number) => {
    const base = 48;
    const scale = 0.6;
    const ratio = width / height;
    return {
        width: Math.round(Math.pow(ratio, scale) * base),
        height: Math.round((Math.pow(ratio, scale) * base) / ratio),
    };
};

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
