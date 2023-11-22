import Artist from "@/components/Artist";
import Loading from "@/components/Loading";
import { fetchArtists } from "@/lib/fetch";
import { Suspense } from "react";

export default async function Artists() {
    const artists = await fetchArtists();
    return (
        <div
            className="wrapper"
            id="artists"
        >
            <h1>Artists</h1>
            <Suspense fallback={<Loading />}>
                <section className="grid">
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
