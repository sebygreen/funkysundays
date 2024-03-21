import Embed from "@/components/Embed";
import Button from "@/components/Button";
import { artist } from "@/lib/fetch";
import parse from "html-react-parser";
import Image from "next/image";
import styles from "./page.module.css";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import Event from "@/components/Event";
import { TextAlignCenter, User } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 300; //5 minutes

export const metadata = {
    title: "Artistes",
};

export default async function Artist({ params }) {
    async function generateStaticParams() {
        const data = await artist.all();
        return data.map((i) => ({
            slug: i.id,
        }));
    }

    let data = await artist.one(params.slug);

    return (
        <main>
            <div className={styles.wrapper}>
                <h1>{data.name}</h1>
                <div className={styles.responsive}>
                    <section className={styles.information}>
                        <figure className={styles.picture}>
                            {data.picture ? (
                                <Image
                                    src={data.picture}
                                    fill={true}
                                    alt={data.name}
                                    sizes="240px"
                                />
                            ) : (
                                <User size={64} color="var(--opaque-pink)" />
                            )}
                        </figure>
                        {data.links.socials && (
                            <div className={styles.socials}>
                                {data.links.socials.map((link) => (
                                    <Button
                                        key={link.id}
                                        type="social"
                                        href={link.url}
                                        platform={link.platform}
                                        text={link.username}
                                        icon={
                                            <SiInstagram
                                                size={18}
                                                color="currentColor"
                                            />
                                        }
                                    />
                                ))}
                            </div>
                        )}
                        {data.upcoming && (
                            <div className="grid">
                                <Event event={data.upcoming} />
                            </div>
                        )}
                    </section>
                    <section className={styles.description}>
                        {data.description ? (
                            parse(data.description)
                        ) : (
                            <TextAlignCenter size={64} />
                        )}
                    </section>
                </div>
                {data.links.socials && (
                    <section className={styles.embeds}>
                        {data.links.embeds.map((link) => (
                            <Embed
                                key={link.id}
                                platform={link.platform}
                                url={link.url}
                            />
                        ))}
                    </section>
                )}
            </div>
        </main>
    );
}
