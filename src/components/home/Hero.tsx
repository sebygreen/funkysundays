import styles from "@/style/home/Hero.module.css";
import festival from "@/images/festival.jpeg";
import { Full } from "@/components/svg/Logo";
import Upcoming from "@/components/home/Upcoming";
import Countdown from "@/components/common/Countdown";
import { EventUpcoming } from "@/types";

export default function Hero({ data }: { data: EventUpcoming | null }) {
    return (
        <section className={styles.container}>
            <div className={styles.background} style={{ backgroundImage: `url(${festival.src})` }} />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Full />
                    <h1>Bring Sundays back to life.</h1>
                </div>
                {data && (
                    <div className={styles.upcoming}>
                        <Countdown start={data.start} started={data.started} />
                        <Upcoming data={data} />
                    </div>
                )}
            </div>
        </section>
    );
}
