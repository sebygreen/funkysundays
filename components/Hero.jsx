import styles from "@/style/Hero.module.css";
import Image from "next/image";
import logo from "@/images/logo.png";
import Upcoming from "./Upcoming";
import texture from "@/images/texture.png";

export default function Hero({ data }) {
    data = data[0];
    return (
        <section
            className={
                !data ? styles.hero : `${styles.hero} ${styles.upcoming}`
            }
        >
            <div
                className={styles.background}
                style={{ backgroundImage: `url(${texture.src})` }}
            />
            <div className={`${styles.content} spaced`}>
                <Image src={logo} alt="Purple logo." />
                <h1>Bring Sundays back to life.</h1>
                {data && <Upcoming event={data} countdown={true} />}
            </div>
        </section>
    );
}
