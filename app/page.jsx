import { event, statistic } from "@/lib/fetch";
import { BeerStein, CalendarCheck, Guitar, Info, UsersFour } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import texture from "@/images/texture.png";
import logo from "@/images/logo.png";
import Statistic from "@/components/Statistic";
import Button from "@/components/Button";
import Upcoming from "@/components/Upcoming";
import styles from "./page.module.css";

export default async function Page() {
    const upcoming = await event.upcoming();
    const attendees = await statistic.attendees();
    const events = await statistic.events();
    const artists = await statistic.artists();
    const sponsors = await statistic.sponsors();
    return (
        <div className="constrain spaced">
            <section className={upcoming.error ? styles.hero : `${styles.hero} ${styles.upcoming}`}>
                <div className={styles.background} style={{ backgroundImage: `url(${texture.src})` }} />
                <div className={`${styles.content} spaced`}>
                    <Image src={logo} alt="Purple logo." />
                    <h1>Bring Sunday back to life.</h1>
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
                <section className={styles.statistics}>
                    <Statistic
                        icon={<UsersFour size={32} color="rgb(170, 218, 247)" />}
                        text="Spectateurs"
                        number={attendees}
                        color="blue"
                    />
                    <Statistic
                        icon={<CalendarCheck size={32} color="rgb(253, 215, 174)" />}
                        text="Évènements"
                        number={events}
                        color="orange"
                    />
                    <Statistic
                        icon={<Guitar size={32} color="rgb(198, 224, 184)" />}
                        text="Artistes"
                        number={artists}
                        color="green"
                    />
                    <Statistic
                        icon={<BeerStein size={32} color="rgb(247, 203, 224)" />}
                        text="Partenaires"
                        number={sponsors}
                        color="pink"
                    />
                </section>
            </div>
        </div>
    );
}
