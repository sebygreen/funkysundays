import Button from "@/components/Button";
import Loading from "@/components/Loading";

import { Info } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import PocketBase from "pocketbase";
import { Suspense } from "react";

import styles from "./page.module.css";
import Artist from "@/components/Artist";

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
                        <Artist
                            key={artist.id}
                            artist={artist}
                        />
                    ))}
                </section>
            </Suspense>
        </div>
    );
}
