import styles from "@/style/Artist.module.css";
import Image from "next/image";
import Button from "./Button";
import { Info } from "@phosphor-icons/react/dist/ssr";

export default function Artist({ artist }) {
    return (
        <article className={styles.artist}>
            <figure className={styles.thumbnail}>
                <Image
                    src={artist.thumbnail}
                    fill={true}
                    alt={artist.name}
                    sizes="80px"
                />
            </figure>
            <span className={styles.content}>
                <h3>{artist.name}</h3>
                <p className={styles.category}>{artist.type}</p>
            </span>
            <Button
                type="route"
                url={`/artists/${artist.id}`}
                icon={<Info size={22} />}
            />
        </article>
    );
}
