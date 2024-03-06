import Artist from "@/components/Artist";
import { artist } from "@/lib/fetch";
import styles from "./page.module.css";

export const revalidate = 300; //5 minutes

export const metadata = {
    title: "Artistes",
};

export default async function Artists() {
    const data = await artist.all();

    return (
        <main>
            <div className={styles.wrapper}>
                <h1>Artistes</h1>
                <section className="grid">
                    {data.map((artist) => (
                        <Artist key={artist.id} artist={artist} />
                    ))}
                </section>
            </div>
        </main>
    );
}
