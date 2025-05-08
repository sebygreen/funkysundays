import { getSponsors } from "@/utilities/fetch/sponsors";
import styles from "./page.module.css";
import Image from "next/image";
import { createImage, scaleLogo } from "@/utilities/tools";
import { ImageBase } from "@/types";
import Link from "next/link";
import parse from "html-react-parser";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sponsors & Partenaires",
};

export default async function Page() {
    const data = await getSponsors();
    const sorted = Object.groupBy(data, ({ type }) => type);

    return (
        <section id="sponsors">
            <div className={styles.wrapper}>
                <h1>Sponsors & Partenaires</h1>
                <h2>Pour l&apos;année de 2025</h2>
                <div className={styles.group}>
                    <Title name="Sponsors" />
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
                    <Title name="Institutions" />
                    <div className={styles.grid}>
                        {sorted.institution &&
                            sorted.institution.length &&
                            sorted.institution.map((i) => (
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
                    <Title name="Fournisseurs" />
                    <div className={styles.grid}>
                        {sorted["food & drink"] &&
                            sorted["food & drink"].length &&
                            sorted["food & drink"].map((i) => (
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
                    <Title name="Services" />
                    <div className={styles.grid}>
                        {sorted.services &&
                            sorted.services.length &&
                            sorted.services.map((i) => (
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
                    <Title name="Media" />
                    <div className={styles.grid}>
                        {sorted.media &&
                            sorted.media.length &&
                            sorted.media.map((i) => (
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
                    <Title name="Associations" />
                    <div className={styles.grid}>
                        {sorted.association &&
                            sorted.association.length &&
                            sorted.association.map((i) => (
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
    url?: string;
    description?: string;
}

function Sponsor({ name, logo, url, description }: SponsorProps) {
    const scaled = scaleLogo(logo.height!, logo.width!, 86);
    return (
        <article className={styles.sponsor}>
            {url ?
                <Link href={url} className={styles.link}>
                    <figure>
                        <Image src={logo.url} width={scaled.width} height={scaled.height} alt={name} />
                    </figure>
                </Link>
            :   <figure>
                    <Image src={logo.url} width={scaled.width} height={scaled.height} alt={name} />
                </figure>
            }
            <div className={styles.description}>{description && parse(description)}</div>
        </article>
    );
}

function Title({ name }: { name: string }) {
    return (
        <div className={styles.names}>
            <div className={styles.hl} />
            <h2>{name}</h2>
            <div className={styles.hl} />
        </div>
    );
}
