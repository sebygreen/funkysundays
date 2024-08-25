import styles from "@/style/About.module.css";
import Button from "@/components/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Stamp from "@/components/svg/Stamp";

export default function About({ data }: { data: number }) {
    return (
        <section className={styles.container}>
            <Stamp />
            <h2>Qui sommes-nous?</h2>
            <p>
                La famille Funky Sundays, basée à Genève, compte aujourd&apos;hui {data} membres bénévoles et nous
                sommes motivés à créer ensemble le meilleur rendez-vous dominical de l’année pour toutes et tous.
            </p>
            <Button type="route" href="/about" icon={<ArrowRight />} text="Découvrir" color="primary" />
        </section>
    );
}
