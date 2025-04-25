import { getSponsors } from "@/utilities/fetch/sponsors";
import styles from "./page.module.css";
import Image from "next/image";
import { createImage, scaleLogo } from "@/utilities/tools";
import { ImageBase } from "@/types";

export default async function Page() {
    const data = await getSponsors();
    const sorted = Object.groupBy(data, ({ type }) => type);

    return (
        <section id="sponsors">
            <div className={styles.wrapper}>
                <h1>Sponsors & Partenaires</h1>
                <div className={styles.group}>
                    <h2>Partenaires</h2>
                    <div className={styles.grid}>
                        {sorted.partner &&
                            sorted.partner.length &&
                            sorted.partner.map((i) => (
                                <Sponsor
                                    key={i.id}
                                    name={i.name}
                                    logo={createImage(
                                        { filename: i.logo, collection: i.collectionId, id: i.id },
                                        { size: true },
                                    )}
                                    url={i.url}
                                    description={i.description}
                                />
                            ))}
                    </div>
                </div>
                <div className={styles.group}>
                    <h2>Sponsors</h2>
                    <div className={styles.grid}>
                        {sorted.sponsor &&
                            sorted.sponsor.length &&
                            sorted.sponsor.map((i) => (
                                <Sponsor
                                    key={i.id}
                                    name={i.name}
                                    logo={createImage(
                                        { filename: i.logo, collection: i.collectionId, id: i.id },
                                        { size: true },
                                    )}
                                    url={i.url}
                                    description={i.description}
                                />
                            ))}
                    </div>
                </div>
                <div className={styles.group}>
                    <h2>Fournisseurs</h2>
                    <div className={styles.grid}>
                        {sorted.supplier &&
                            sorted.supplier.length &&
                            sorted.supplier.map((i) => (
                                <Sponsor
                                    key={i.id}
                                    name={i.name}
                                    logo={createImage(
                                        { filename: i.logo, collection: i.collectionId, id: i.id },
                                        { size: true },
                                    )}
                                    url={i.url}
                                    description={i.description}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface SponsorProps {
    name: string;
    logo: ImageBase;
    url: string;
    description?: string;
}

function Sponsor({ name, logo, url, description }: SponsorProps) {
    const scaled = scaleLogo(logo.height!, logo.width!);
    return (
        <article className={styles.sponsor}>
            <figure className={styles.partner}>
                <Image src={logo.url} width={scaled.width} height={scaled.height} alt={name} />
            </figure>
            <p>{name}</p>
        </article>
    );
}
