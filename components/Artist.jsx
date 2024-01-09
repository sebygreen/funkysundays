import styles from "@/style/Artist.module.css";
import Image from "next/image";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Artist({ artist }) {
    return (
        <Link
            href={`/artists/${artist.id}`}
            className={styles.route}
        >
            <article className={styles.container}>
                <figure className={styles.picture}>
                    <Image
                        src={artist.picture}
                        fill={true}
                        alt={artist.name}
                        sizes="80px"
                    />
                </figure>
                <span className={styles.text}>
                    <h3>{artist.name}</h3>
                    <p className={styles.category}>{artist.type}</p>
                </span>
                <CaretRight size={22} />
            </article>
        </Link>
    );
}
