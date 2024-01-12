import styles from "@/style/Collaborations.module.css";
import Image from "next/image";

export default function Collaborations({ items, type }) {
    return (
        <div className={`${styles.container} ${type && type === "sponsors" ? styles.sponsors : styles.partners}`}>
            {items.map((i) =>
                i.url ? (
                    <a key={i.id} target="_blank" href={i.url}>
                        <Image src={i.logo.src} height={i.logo.size[0]} width={i.logo.size[1]} alt={i.name} />
                    </a>
                ) : (
                    <Image key={i.id} src={i.logo.src} height={i.logo.size[0]} width={i.logo.size[1]} alt={i.name} />
                ),
            )}
        </div>
    );
}
