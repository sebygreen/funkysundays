import Button from "@/components/Button";
import Embed from "@/components/Embed";
import Event from "@/components/Event";
import Loading from "@/components/Loading";
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
    const data = await pb.collection("artists").getFullList({
        requestKey: "artist-ids",
        fields: "id",
    });
    return data;
}

async function fetchArtist(id) {
    const data = await pb.collection("artists").getOne(id, {
        requestKey: "artist",
        //filter: `schedule(artist).start > "${dayjs().format()}"`,
        fields: "id, collectionId, thumbnail, name, description, expand.links.id, expand.links.embed, expand.links.platform, expand.links.username, expand.links.url, expand.schedule(artist).start, expand.schedule(artist).expand.event.id, expand.schedule(artist).expand.event.name, expand.schedule(artist).expand.event.category",
        expand: "links, schedule(artist).event",
    });

    //console.dir(response, { depth: "full" });

    function Link(link) {}

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
                var upcomingEvent = artist.expand["schedule(artist)"].find((item) => item.start > dayjs().format());
                if (upcomingEvent) {
                    this.event = {
                        start: dayjs(upcomingEvent.start),
                        id: upcomingEvent.expand.event.id,
                        name: upcomingEvent.expand.event.name,
                        category: upcomingEvent.expand.event.category,
                    };
                }
            }
        }
    }
    const artist = new Artist(data);
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
                                {artist.links.map(
                                    (link) =>
                                        !link.embed && (
                                            <Button
                                                key={link.id}
                                                type="social"
                                                url={link.url}
                                                platform={link.platform}
                                                text={link.username}
                                            />
                                        )
                                )}
                            </div>
                        )}
                    </div>
                    {artist.event && <Event event={artist.event} />}
                    <div className={styles.description}>{parse(artist.description)}</div>
                </section>
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
