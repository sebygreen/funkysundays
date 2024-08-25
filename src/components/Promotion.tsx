import styles from "@/style/Promotion.module.css";
import { Empty } from "@phosphor-icons/react/dist/ssr";
import Event from "@/components/Event";
import { EventBase } from "@/types";

export default function Promotion({ data }: { data: EventBase[] }) {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <h2>Soirées de Promotion</h2>
                {data.length > 0 ? (
                    <div className="grid">
                        {data.map((i) => (
                            <Event key={i.id} data={i} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <Empty weight="duotone" />
                        <p>Pas d&apos;évènements à venir. </p>
                    </div>
                )}
            </div>
        </section>
    );
}
