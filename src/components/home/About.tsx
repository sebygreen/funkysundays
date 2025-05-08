import styles from "@/style/home/About.module.css";
import Button from "@/components/common/Button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Stamp from "@/components/home/Stamp";

export default function About() {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <Stamp />
                <h2>Qui sommes-nous?</h2>
                <p>
                    La famille Funky Sundays, basée à Genève, compte aujourd&apos;hui 20 membres bénévoles et nous
                    sommes motivés à créer ensemble le meilleur rendez-vous dominical de l’année pour toutes et tous.
                </p>
                <Button type="route" url="/about" icon={<ArrowRight />} text="À Propos" color="primary" />
            </div>
        </section>
    );
}
