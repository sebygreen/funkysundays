import styles from "@/style/Hero.module.css";
import Image from "next/image";
import logo from "@/images/logo.png";
import Upcoming from "./Upcoming";
import texture from "@/images/texture.png";

export default function Hero({ data }) {
    return (
        <section className={styles.container}>
            <div className={styles.background} style={{ backgroundImage: `url(${texture.src})` }} />
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <Image src={logo} alt="Purple logo." />
                    <h1>Bring Sundays back to life.</h1>
                </div>
                <Upcoming event={data[0]} countdown={true} alternate={true} />
            </div>
        </section>
    );
}
