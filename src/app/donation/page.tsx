import styles from "./page.module.css";
import Donate from "@/components/common/Donate";
import { MusicNote, Drop, FilmStrip, Handshake } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
    return (
        <>
            <section id="introduction" className={styles.introduction}>
                <div className={styles.wrapper}>
                    <h1>Donations</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus convallis fringilla viverra.
                        Vivamus id dictum ligula. Morbi eu elit quis erat pulvinar aliquam et faucibus metus. Phasellus
                        vel interdum justo. Sed porta metus leo, ultrices volutpat ligula suscipit et. Vivamus volutpat
                        quam ac tellus pharetra eleifend. Morbi aliquet facilisis justo, mattis gravida ipsum iaculis
                        ac. Aenean id facilisis nunc, sed egestas tortor. Quisque luctus, sapien eget facilisis
                        consectetur, mauris leo lobortis lorem, nec porta erat est eu quam.
                    </p>
                    <Donate />
                </div>
            </section>
            <section id="costs" className={styles.costs}>
                <div className={styles.wrapper}>
                    <h2>Coûts</h2>
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
