import styles from "@/style/About.module.css";
import Button from "./Button";
import { Info } from "@phosphor-icons/react/dist/ssr";
import Stamp from "@/components/Stamp";

export default function About() {
    return (
        <section className={styles.container}>
            <Stamp />
            <h2>Qui sommes-nous?</h2>
            <p>
                La famille Funky Sundays, basée à Genève, compte aujourd’hui 12 membres bénévoles et nous sommes motivés
                à créer ensemble le meilleur rendez-vous dominical de l’année pour toutes et tous.
            </p>
            <Button type="route" href="/about" icon={<Info size={22} />} text="Découvrir" />
        </section>
    );
}
