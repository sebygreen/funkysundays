import Artist from "@/components/Artist";
import { artist } from "@/lib/fetch";

export const revalidate = 300;

export const metadata = {
    title: "Artistes",
};

export default async function Artists() {
    const data = await artist.all();
    return (
        <div className="constrain spaced">
            <h1>Artistes</h1>
            <section className="grid">
                {data.map((artist) => (
                    <Artist key={artist.id} artist={artist} />
                ))}
            </section>
        </div>
    );
}
