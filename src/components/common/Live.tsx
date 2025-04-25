import styles from "@/style/common/Live.module.css";
import { clsx } from "clsx";

interface Props {
    small?: boolean;
    className?: string;
}

export default function Live({ ...props }: Props) {
    return (
        <section className={clsx(styles.started, props.small && styles.small, props.className && props.className)}>
            {!props.small && <p>En Cours</p>}
            <div className={styles.dot}>
                <div className={styles.inner} />
                <div className={styles.outer} />
            </div>
        </section>
    );
}
