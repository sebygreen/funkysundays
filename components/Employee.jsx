import styles from "@/style/Employee.module.css";
import Image from "next/image";
import { User } from "@phosphor-icons/react/dist/ssr";

export default function Employee({ employee }) {
    if (employee.status === "Comité") {
        return (
            <article key={employee.id} className={styles.committee}>
                <div>
                    <figure>
                        {employee.picture ? (
                            <Image src={employee.picture} alt={employee.name} fill={true} sizes="120px" />
                        ) : (
                            <User size={64} color="var(--opaque-pink)" />
                        )}
                    </figure>
                    <p className={styles.name}>{employee.name}</p>
                    <p className={styles.group}>{employee.status}</p>
                </div>
                <ul>
                    {employee.position.map((i) => (
                        <li key={i}>{i}</li>
                    ))}
                </ul>
            </article>
        );
    } else {
        return (
            <article key={employee.id} className={styles.member}>
                <figure>
                    {employee.picture ? (
                        <Image src={employee.picture} alt={employee.name} fill={true} sizes="200" />
                    ) : (
                        <User size={64} color="var(--opaque-pink)" />
                    )}
                </figure>
                <div>
                    <p className={styles.name}>{employee.name}</p>
                    <p className={styles.group}>{employee.role}</p>
                </div>
            </article>
        );
    }
}
