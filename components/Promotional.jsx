import Event from "@/components/Event";
import styles from "@/style/Promotional.module.css";

export default function Promotional({ data }) {
    return (
        <section className={styles.container}>
            <h2>Soirées de promotion</h2>
            <div className="grid">
                {data.map((i) => (
                    <Event key={i.id} event={i} />
                ))}
            </div>
        </section>
    );
}
