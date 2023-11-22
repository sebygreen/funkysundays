import styles from "@/style/Hero.module.css";
import Image from "next/image";
import logo from "@/images/logo.png";
import Upcoming from "./Upcoming";

export default function Hero({ event }) {
    return (
        <div
            id="hero"
            className={styles.container}
        >
            <div className={styles.texture} />
            <div className="wrapper">
                <section className={styles.content}>
                    <Image
                        src={logo}
                        alt="Purple logo."
                    />
                    <h1>Making sundays a better day since 2019.</h1>
                    {event ? <Upcoming event={event} /> : <p>No upcoming events for now.</p>}
                </section>
            </div>
        </div>
    );
}
