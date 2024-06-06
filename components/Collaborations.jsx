import styles from "@/style/Collaborations.module.css";
import Image from "next/image";

export default function Collaborations({ items, type }) {
    return (
        <div className={`${styles.container} ${type && type === "sponsors" ? styles.sponsors : styles.partners}`}>
            {items.map((i) =>
                i.url ? (
                    <a key={i.id} target="_blank" href={i.url}>
                        <Image
                            src={i.logo.src}
                            height={i.logo.height}
                            width={i.logo.width}
                            alt={i.name}
                            className={i.logo.width * 0.1875 > 256 ? styles.wide : styles.tall}
                        />
                    </a>
                ) : (
                    <figure key={i.id}>
                        <Image
                            src={i.logo.src}
                            height={i.logo.height}
                            width={i.logo.width}
                            alt={i.name}
                            className={i.logo.width > 256 ? styles.wide : styles.tall}
                        />
                    </figure>
                ),
            )}
        </div>
    );
}
