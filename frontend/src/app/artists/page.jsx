import Artist from "@/components/artists/Artist";
import Loading from "@/components/layout/Loading";
import { artists } from "@/lib/fetch";
import { Suspense } from "react";

export default async function Artists() {
    const artists = await artists();
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
