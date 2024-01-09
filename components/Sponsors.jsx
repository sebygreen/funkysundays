import Image from "next/image";
import styles from "@/style/Sponsors.module.css";

export default function Sponsors({ sponsors }) {
    return (
        <div className={styles.container}>
            {sponsors.map((sponsor) => (
                <a
                    key={sponsor.id}
                    href={sponsor.url}
                >
                    <Image
                        src={sponsor.logo}
                        fill={true}
                        sizes="32px"
                        alt={sponsor.name}
                    />
                </a>
            ))}
        </div>
    );
}
