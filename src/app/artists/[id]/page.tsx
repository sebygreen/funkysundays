import styles from "./page.module.css";
import { Empty, FacebookLogo, InstagramLogo, SoundcloudLogo, SpotifyLogo, User } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Button from "@/components/common/Button";
import parse from "html-react-parser";
import Event from "@/components/common/Event";
import Embed from "@/components/artists/Embed";
import { Metadata } from "next";
import { fetchArtist, fetchArtists } from "@/utilities/fetch/artists";

export async function generateStaticParams() {
    const data = await fetchArtists();
    return data.map((i) => ({ id: i.id }));
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const params = await props.params;
    const id = params.id;
    const artist = await fetchArtist(id);
    return {
        title: `Artistes • ${artist.name}`,
    };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const data = await fetchArtist(params.id);
    
    function platformIcon(platform: "instagram" | "facebook" | "spotify" | "soundcloud") {
        switch (platform) {
            case "facebook":
                return <FacebookLogo />;
            case "instagram":
                return <InstagramLogo />;
            case "spotify":
                return <SpotifyLogo />;
            case "soundcloud":
                return <SoundcloudLogo />;
        }
    }

    return (
        <main>
            <section className={styles.header}>
                <div className={styles.wrapper}>
                    <h1>{data.name}</h1>
                </div>
            </section>
            <div className={styles.responsive}>
                <div className={styles.wrapper}>
                    <section className={styles.metadata}>
                        <figure className={styles.picture}>
                            {data.picture ?
                                <Image src={data.picture.url} fill={true} alt={data.name} sizes="200px" />
                            :   <User />}
                        </figure>
                        <div className={styles.socials}>
                            {data.socials.map((i) => (
                                <Button
                                    type="anchor"
                                    key={i.id}
                                    color={i.platform}
                                    text={i.username}
                                    icon={platformIcon(i.platform)}
                                    url={i.url}
                                    target="_blank"
                                />
                            ))}
                        </div>
                    </section>
                    <section className={styles.description}>
                        {data.description ?
                            <div className={styles.text}>{parse(data.description)}</div>
                        :   <div className={styles.empty}>
                                <Empty weight="duotone" />
                                <p>Pas de description à montrer. </p>
                            </div>
                        }
                    </section>
                </div>
            </div>
            {data.upcoming && (
                <section className={styles.upcoming}>
                    <div className={styles.wrapper}>
                        <div className="grid">
                            {data.upcoming.map((i) => (
                                <Event key={i.id} data={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {data.embeds && (
                <section className={styles.embeds}>
                    <div className={styles.wrapper}>
                        {data.embeds.map((i) => (
                            <Embed key={i.id} data={i} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
