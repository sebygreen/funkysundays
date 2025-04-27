import styles from "./page.module.css";
import Donate from "@/components/common/Donate";
import { Drop, FilmStrip, Handshake, MusicNote } from "@phosphor-icons/react/dist/ssr";
import { Lock } from "@phosphor-icons/react/dist/ssr";
import { Stripe } from "@/components/svg/Stripe";

export default function Page() {
    return (
        <>
            <section id="introduction" className={styles.introduction}>
                <div className={styles.wrapper}>
                    <h1>Dons</h1>
                    <h2>Soutenez notre festival du dimanche</h2>
                    <div className={styles.message}>
                        <p>
                            Nous avons lancé ce festival avec une idée simple: Bring Sundays Back to Life. Alors que le
                            week-end est synonyme d’inactivité, nous transformons le dimanche en fête — avec de la
                            musique live, de la bonne énergie, et une communauté réunie pour en profiter.
                        </p>
                        <p>
                            Notre prochaine édition aura lieu les 5 et 6 juillet, et comme toujours, l’entrée est
                            gratuite et ouverte à tous. Mais pour que cela reste possible, nous avons besoin de votre
                            soutien.
                        </p>
                        <p>
                            Votre don nous aide à couvrir les coûts essentiels: rémunérer les artistes, installer la
                            scène, fournir un son et des lumières de qualité, et payer les frais de location.
                        </p>
                    </div>
                    <Donate />
                    <p className={styles.secure}>
                        <Lock weight="fill" />
                        <Stripe />
                    </p>
                </div>
            </section>
            <section id="costs" className={styles.costs}>
                <div className={styles.wrapper}>
                    <div className={styles.divisions}>
                        <article>
                            <FilmStrip weight="duotone" />
                            <p>Communication & Image</p>
                            <div className={styles.bullets}>
                                <p>Marketing local</p>
                                <p>Soirées de promotion</p>
                                <p>Production de médias</p>
                            </div>
                        </article>
                        <article>
                            <Drop weight="duotone" />
                            <p>Logistique</p>
                            <div className={styles.bullets}>
                                <p>Électricité, lumières et son</p>
                                <p>Refrigération</p>
                                <p>Location de matèriel</p>
                            </div>
                        </article>
                        <article>
                            <MusicNote weight="duotone" />
                            <p>Musique</p>
                            <div className={styles.bullets}>
                                <p>Artistes locaux</p>
                                <p>Sonorité fiable et de qualité</p>
                                <p>Instruments</p>
                            </div>
                        </article>
                        <article>
                            <Handshake weight="duotone" />
                            <p>Partenaires & Sponsoring</p>
                            <div className={styles.bullets}>
                                <p>Réservations</p>
                                <p>Contrats et obligations</p>
                                <p>Boissons</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}
