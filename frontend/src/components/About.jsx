import styles from "@/style/home/About.module.css";
import Button from "../layout/Button";
import { Info } from "@phosphor-icons/react/dist/ssr";

export default function About() {
    return (
        <section
            id="about"
            className={styles.container}
        >
            <h2>What is this?</h2>
            <p>
                Initialement sous le nom “Lausanne Funky Sunday”, c&apos;est en septembre 2018 que l&apos;association
                Funky Sundays voit le jour. Cette association fondée par un groupe d&apos;amis, 16 anciens étudiants de
                l&apos;EPFL avait pour but de mettre sur pied un festival de musique le dimanche.
            </p>
            <Button
                type="route"
                href="/about"
                icon={<Info size={22} />}
                text="Discover"
            />
        </section>
    );
}
