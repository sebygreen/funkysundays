import styles from "./page.module.css";
import Image from "next/image";
import { fetchStaff } from "@/utilities/fetch";
import Employee from "@/components/Employee";
import Stickers from "@/components/client/Stickers";

export default async function Page() {
    const data = {
        staff: await fetchStaff(),
    };

    return (
        <main>
            <section className={styles.introduction}>
                <div className={styles.wrapper}>
                    <Stickers />
                    <h1>Qui sommes-nous?</h1>
                    <p>
                        Initialement sous le nom «Lausanne Funky Sunday», c’est en septembre 2018 que l’association
                        Funky Sundays voit le jour. Cette association fondée par un groupe d’amis, 16 anciens étudiants
                        de l’EPFL à Lausanne et ayant démarré dans le cadre d’un cours de Gestion des Organisations,
                        avait pour but de mettre sur pied un festival de musique le dimanche.
                    </p>
                    <p>
                        Le dimanche 19 mai 2019, s’est tenu la première édition du festival qui a réuni près de 1’000
                        personnes un jour de pluie. Motivés par cette réussite et la joie provoquée sur le visage des
                        participants et des organisateurs, nous décidons de continuer l’aventure à Genève, désormais
                        sous le nom «Funky Sundays».
                    </p>
                    <p>
                        La deuxième édition a connu un grand succès le dimanche 24 septembre 2023, à la Plage des
                        Eaux-Vives à Genève et après une longue pause dû à la pandémie de COVID-19. L’événement,
                        d’envergure plus importante que le premier, a rassemblé plus de 3’000 personnes sur une
                        magnifique journée ensoleillée, remplie de joie et de musique.
                    </p>
                </div>
            </section>
            <section className={styles.committee}>
                <div className={styles.wrapper}>
                    {data.staff
                        .filter((i) => i.status === "Comité")
                        .map((i) => (
                            <Employee key={i.id} data={i} />
                        ))}
                </div>
            </section>
            <section className={styles.members}>
                <div className={styles.wrapper}>
                    {data.staff
                        .filter((i) => i.status === "Membre" || i.status === "Externe")
                        .map((i) => (
                            <Employee key={i.id} data={i} />
                        ))}
                </div>
            </section>
        </main>
    );
}
