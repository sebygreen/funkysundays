import { event } from "@/lib/fetch";
import { Info } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import texture from "@/images/texture.png";
import logo from "@/images/logo.png";
import Button from "@/components/Button";
import Upcoming from "@/components/Upcoming";
import styles from "./page.module.css";
import Statistics from "@/components/Statistics";

export const revalidate = 300;

export default async function Page() {
    const upcoming = await event.upcoming();
    return (
        <div className="constrain spaced">
            <section className={upcoming.error ? styles.hero : `${styles.hero} ${styles.upcoming}`}>
                <div className={styles.background} style={{ backgroundImage: `url(${texture.src})` }} />
                <div className={`${styles.content} spaced`}>
                    <Image src={logo} alt="Purple logo." />
                    <h1>Bring Sundays back to life.</h1>
                    {!upcoming.error && <Upcoming event={upcoming} countdown={true} />}
                </div>
            </section>
            <div className={styles.responsive}>
                <section id="about" className="spaced">
                    <h2>Qui sommes-nous?</h2>
                    <p>
                        La famille Funky Sundays, basée à Genève, compte aujourd’hui 12 membres bénévoles et nous sommes
                        motivés à créer ensemble le meilleur rendez-vous dominical de l’année pour toutes et tous.
                    </p>
                    <Button type="route" href="/about" icon={<Info size={22} />} text="Découvrir" />
                </section>
                <Statistics />
            </div>
        </div>
    );
}
