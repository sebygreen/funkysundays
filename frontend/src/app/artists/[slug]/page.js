import Back from "@/components/client/back";
import Button from "@/components/server/button";
import Embed from "@/components/server/embed";
import Loading from "@/components/server/loading";

import { Info } from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import parse from "html-react-parser";
import Image from "next/image";
import PocketBase from "pocketbase";
import { Suspense } from "react";

import styles from "./page.module.css";

dayjs.extend(localizedFormat);

const pb = new PocketBase("http://127.0.0.1:8090");
async function fetchArtistIds() {
    const response = await pb.collection("artists").getFullList({
        fields: "id",
    });
    return response;
}
async function fetchArtist(id) {
    function Artist(artist) {
        this.id = artist.id;
        this.thumbnail = `http://127.0.0.1:8090/api/files/${artist.collectionId}/${this.id}/${artist.thumbnail}`;
        this.name = artist.name;
        this.description = artist.description;
        if (artist.expand) {
            if (artist.expand.links) {
                this.links = artist.expand.links.map((link) => {
                    return {
                        id: link.id,
                        embed: link.embed,
                        platform: link.platform,
                        username: link.username,
                        url: link.url,
                    };
                });
            }
            if (artist.expand["schedule(artist)"]) {
                var nextSet = artist.expand["schedule(artist)"].find((item) => item.start > dayjs().format());
                if (nextSet) {
                    this.nextEvent = {
                        start: dayjs(nextSet.start),
                        eventId: nextSet.expand.event.id,
                        eventName: nextSet.expand.event.name,
                    };
                }
            }
        }
    }
    const response = await pb.collection("artists").getOne(id, {
        //filter: `schedule(artist).start > "${dayjs().format()}"`,
        fields: "id, collectionId, thumbnail, name, description, expand.links.id, expand.links.embed, expand.links.platform, expand.links.username, expand.links.url, expand.schedule(artist).start, expand.schedule(artist).expand.event",
        expand: "links, schedule(artist).event",
    });
    const artist = new Artist(response);
    return artist;
}

export default async function Page({ params }) {
    async function generateStaticParams() {
        const artistIds = await fetchArtistIds();
        return artistIds.map((artist) => ({
            slug: artist.id,
        }));
    }
    const artist = await fetchArtist(params.slug);
    //console.dir(artist, { depth: "full" });
    return (
        <div
            className={`wrapper ${styles.wrapper}`}
            id="artist"
        >
            <Back />
            <Suspense fallback={<Loading />}>
                <h1>{artist.name}</h1>
                <section className={styles.content}>
                    <div className={styles.media}>
                        <div className={styles.thumbnail}>
                            <Image
                                src={artist.thumbnail}
                                alt={artist.name}
                                fill={true}
                                sizes="240px"
                            />
                        </div>
                        {artist.links && (
                            <div className={styles.socials}>
                                {artist.links.map((link) => {
                                    if (!link.embed) {
                                        return (
                                            <Button
                                                key={link.id}
                                                type="social"
                                                url={link.url}
                                                platform={link.platform}
                                                text={link.username}
                                            />
                                        );
                                    }
                                })}
                            </div>
                        )}
                    </div>
                    <div className={styles.description}>{parse(artist.description)}</div>
                </section>
                {artist.nextEvent && (
                    <section className={styles.nextEvent}>
                        <div className={styles.calendar}>
                            <p className={styles.month}>{artist.nextEvent.start.format("MMM")}</p>
                            <p className={styles.day}>{artist.nextEvent.start.format("DD")}</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.eventName}>{artist.nextEvent.eventName}</p>
                            <p className={styles.time}>
                                {artist.nextEvent.start.isSame(dayjs(), "year")
                                    ? artist.nextEvent.start.format("HH:mm")
                                    : artist.nextEvent.start.format("YYYY")}
                            </p>
                        </div>
                        <Button
                            type="route"
                            url={`/events/${artist.nextEvent.eventId}`}
                            icon={<Info size={22} />}
                        />
                    </section>
                )}
                {artist.links && (
                    <section className={styles.embeds}>
                        {artist.links.map((link) => {
                            if (link.embed) {
                                return (
                                    <Embed
                                        key={link.id}
                                        platform={link.platform}
                                        url={link.url}
                                    />
                                );
                            }
                        })}
                    </section>
                )}
            </Suspense>
        </div>
    );
}
