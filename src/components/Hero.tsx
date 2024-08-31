import styles from "@/style/Hero.module.css";
import texture from "@/images/texture.png";
import { Full } from "@/components/svg/Logo";
import { PaintRoller } from "@phosphor-icons/react/dist/ssr";
import Upcoming from "@/components/Upcoming";
import Countdown from "@/components/client/Countdown";
import { EventUpcoming } from "@/types";

export default function Hero({ data }: { data: EventUpcoming | null }) {
    return (
        <section className={styles.container}>
            <div className={styles.background} style={{ backgroundImage: `url(${texture.src})` }} />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Full />
                    <h1>Bring Sundays back to life.</h1>
                </div>
                <div className={styles.upcoming}>
                    {data ?
                        <>
                            <Countdown start={data.start} />
                            <Upcoming data={data} />
                        </>
                        : <div className={styles.empty}>
                            <p>Coming soon...</p>
                            <PaintRoller weight="duotone" />
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}
