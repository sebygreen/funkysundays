import Embed from "@/components/artists/Embed";
import Event from "@/components/events/Event";
import Button from "@/components/layout/Button";
import Loading from "@/components/layout/Loading";
import { artist, artistSlugs } from "@/lib/fetch";
import parse from "html-react-parser";
import Image from "next/image";
import { Suspense } from "react";
import styles from "./page.module.css";

export default async function Artist({ params }) {
    async function generateStaticParams() {
        const artistIds = await artistSlugs();
        return artistIds.map((artist) => ({
            slug: artist.id,
        }));
    }
    const artist = await artist(params.slug);
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
