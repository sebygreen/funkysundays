import Embed from "@/components/Embed";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { artist } from "@/lib/fetch";
import parse from "html-react-parser";
import Image from "next/image";
import { Suspense } from "react";
import styles from "./page.module.css";
import Upcoming from "@/components/Upcoming";
import { SiInstagram } from "@icons-pack/react-simple-icons";

export const metadata = {
    title: "Artistes",
};

export default async function Artist({ params }) {
    async function generateStaticParams() {
        const data = await artist.slugs();
        return data.map((i) => ({
            slug: i.id,
        }));
    }
    let data = await artist.one(params.slug, true);
    return (
        <div className="constrain spaced">
            <Suspense fallback={<Loading />}>
                <h1>{data.name}</h1>
                <section className={styles.metadata}>
                    <div className="spaced">
                        <figure className={styles.picture}>
                            <Image src={data.picture} alt={data.name} fill={true} sizes="240px" />
                        </figure>
                        {data.links && (
                            <div className={styles.socials}>
                                {data.links.map(
                                    (link) =>
                                        !link.embed && (
                                            <Button
                                                key={link.id}
                                                type="social"
                                                url={link.url}
                                                platform={link.platform}
                                                text={link.username}
                                                icon={<SiInstagram size={18} color="currentColor" />}
                                            />
                                        ),
                                )}
                            </div>
                        )}
                        {data.upcoming && <Upcoming event={data.upcoming} countdown={false} />}
                    </div>
                    <div className={`${styles.description} spaced`}>{parse(data.description)}</div>
                </section>
                {data.links && (
                    <section className={styles.embeds}>
                        {data.links.map((link) => {
                            if (link.embed) {
                                return <Embed key={link.id} platform={link.platform} url={link.url} />;
                            }
                        })}
                    </section>
                )}
            </Suspense>
        </div>
    );
}
