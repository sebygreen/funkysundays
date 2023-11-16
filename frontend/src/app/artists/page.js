import Button from "@/components/server/button";
import Loading from "@/components/server/Loading";

import { Info } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import PocketBase from "pocketbase";
import { Suspense } from "react";

import styles from "./page.module.css";

const pb = new PocketBase("http://127.0.0.1:8090");
async function fetchArtists() {
    const response = await pb.collection("artists").getFullList({
        requestKey: "artists",
        field: "id, collectionId, name, thumbnail, type",
    });
    function Artist(artist) {
        this.id = artist.id;
        this.thumbnail = `http://127.0.0.1:8090/api/files/${artist.collectionId}/${this.id}/${artist.thumbnail}`;
        this.name = artist.name;
        this.type = artist.type;
    }
    const artists = response.map((artist) => {
        return new Artist(artist);
    });
    return artists;
}

export default async function Page() {
    const artists = await fetchArtists();
    //console.dir(artists[0], { depth: "full" });
    return (
        <div
            className={`wrapper ${styles.wrapper}`}
            id="artists"
        >
            <h1>Artists</h1>
            <Suspense fallback={<Loading />}>
                <section className={styles.artists}>
                    {artists.map((artist) => (
                        <article
                            key={artist.id}
                            className={styles.artist}
                        >
                            <figure className={styles.thumbnail}>
                                <Image
                                    src={artist.thumbnail}
                                    fill={true}
                                    alt={artist.name}
                                    sizes="80px"
                                />
                            </figure>
                            <div>
                                <h2 className={styles.name}>{artist.name}</h2>
                                <p className={styles.type}>{artist.type}</p>
                            </div>
                            <Button
                                type="route"
                                url={`/artists/${artist.id}`}
                                icon={<Info size={22} />}
                            />
                        </article>
                    ))}
                </section>
            </Suspense>
        </div>
    );
}
