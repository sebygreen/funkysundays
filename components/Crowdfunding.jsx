import styles from "@/style/Crowdfunding.module.css";
import Button from "@/components/Button";
import { ArrowSquareOut, HandHeart } from "@phosphor-icons/react/dist/ssr";

export default function Crowdfunding() {
    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.banner}>
                    <div className={styles.header}>
                        <HandHeart size={32} weight="duotone" />
                        <h2>Crowdfunding 2024</h2>
                    </div>
                    <p>La campagne de crowdfunding pour l&apos;édition 2024 est officiellement lancée!</p>
                    <Button
                        type="anchor"
                        href="https://www.lokalhelden.ch/fr/funky-sundays-festival"
                        icon={<ArrowSquareOut size={22} />}
                        text="heroslocaux.ch"
                    />
                </div>
            </div>
        </section>
    );
}
