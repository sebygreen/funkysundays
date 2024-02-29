import { Info } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/Button";
import styles from "./page.module.css";
import Statistics from "@/components/Statistics";
import Hero from "@/components/Hero";
import Promotional from "@/components/Promotional";
import { event } from "@/lib/fetch";

export const revalidate = 300; //5 minutes

export default async function Page() {
    const data = await event.upcoming();
    const events = {
        round: [],
        promotional: [],
    };
    data.map((i) => {
        if (i.category === "Un Funky Sunday") {
            events.round.push(i);
        } else {
            events.promotional.push(i);
        }
    });
    console.log(events);
    return (
        <div className="constrain spaced">
            <Hero data={events.round} />
            {events.promotional.length !== 0 && (
                <Promotional data={events.promotional} />
            )}
            <div className={styles.responsive}>
                <section id="about" className="spaced">
                    <h2>Qui sommes-nous?</h2>
                    <p>
                        La famille Funky Sundays, basée à Genève, compte
                        aujourd’hui 12 membres bénévoles et nous sommes motivés
                        à créer ensemble le meilleur rendez-vous dominical de
                        l’année pour toutes et tous.
                    </p>
                    <Button
                        type="route"
                        href="/about"
                        icon={<Info size={22} />}
                        text="Découvrir"
                    />
                </section>
                <Statistics />
            </div>
        </div>
    );
}
