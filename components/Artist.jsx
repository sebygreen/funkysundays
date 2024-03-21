import styles from "@/style/Artist.module.css";
import Image from "next/image";
import { CaretRight, User } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Artist({ artist }) {
    return (
        <Link href={`/artists/${artist.id}`} className={styles.route}>
            <article className={styles.container}>
                <figure className={styles.picture}>
                    {artist.picture ? (
                        <Image
                            src={artist.picture}
                            fill={true}
                            alt={artist.name}
                            sizes="80px"
                        />
                    ) : (
                        <User size={48} color="var(--opaque-pink)" />
                    )}
                </figure>
                <span className={styles.text}>
                    <h3>{artist.name}</h3>
                    <p className={styles.category}>{artist.type}</p>
                </span>
                <CaretRight className={styles.caret} size={22} />
            </article>
        </Link>
    );
}
