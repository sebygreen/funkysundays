import Artist from "@/components/Artist";
import Loading from "@/components/Loading";
import { artist } from "@/lib/fetch";
import { Suspense } from "react";

export const revalidate = 300;

export const metadata = {
    title: "Artistes",
};

export default async function Artists() {
    const artists = await artist.all();
    return (
        <div className="constrain spaced">
            <h1>Artistes</h1>
            <Suspense fallback={<Loading />}>
                <section className="grid">
                    {artists.map((artist) => (
                        <Artist key={artist.id} artist={artist} />
                    ))}
                </section>
            </Suspense>
        </div>
    );
}
