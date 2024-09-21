import styles from "./page.module.css";
import { fetchArtist, fetchArtistIds } from "@/utilities/fetch";
import { Empty, User } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Button from "@/components/Button";
import parse from "html-react-parser";
import Event from "@/components/Event";
import Embed from "@/components/Embed";

export const revalidate = 30;

export async function generateStaticParams() {
    const data = await fetchArtistIds();
    return data.map((i) => ({ id: i.id }));
}

export default async function Page({ params }: { params: { id: string } }) {
    const data = await fetchArtist(params.id);

    console.log(data);

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
                                    key={i.id}
                                    type="social"
                                    platform={i.platform}
                                    text={i.username}
                                    href={i.url}
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
                            <Embed key={i.id} platform={i.platform} url={i.url} />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
