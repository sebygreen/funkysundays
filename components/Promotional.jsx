import Event from "@/components/Event";
import styles from "@/style/Promotional.module.css";

export default function Promotional({ data }) {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <h2>Soirées de promotion</h2>
                {data.length > 0 ? (
                    <div className="grid">
                        {data.map((i) => (
                            <Event key={i.id} event={i} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p>Pas d&apos;évènements à venir. </p>
                    </div>
                )}
            </div>
        </section>
    );
}
