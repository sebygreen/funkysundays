import styles from "@/style/about/Employee.module.css";
import { User } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { StaffBase } from "@/types";

export default function Employee({ data }: { data: StaffBase }) {
    if (data.status === "Comité") {
        return (
            <article key={data.id} className={styles.committee}>
                <div>
                    <figure>
                        {data.picture ?
                            <Image src={data.picture.url} alt={data.name} fill={true} sizes="120px" />
                        :   <User />}
                    </figure>
                    <p className={styles.name}>{data.name}</p>
                    <p className={styles.group}>{data.status}</p>
                </div>
                {data.position && (
                    <ul>
                        {data.position.map((i) => (
                            <li key={i}>{i}</li>
                        ))}
                    </ul>
                )}
            </article>
        );
    } else {
        return (
            <article key={data.id} className={styles.member}>
                <figure>
                    {data.picture ?
                        <Image src={data.picture.url} alt={data.name} fill={true} sizes="200" />
                    :   <User />}
                </figure>
                <div>
                    <p className={styles.name}>{data.name}</p>
                    <p className={styles.group}>{data.role}</p>
                </div>
            </article>
        );
    }
}
