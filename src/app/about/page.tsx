import styles from "./page.module.css";
import Employee from "@/components/about/Employee";
import Stickers from "@/components/about/Stickers";
import { fetchStaff } from "@/utilities/fetch/about";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "À Propos",
};

export default async function Page() {
    const data = { staff: await fetchStaff() };

    return (
        <>
            <section className={styles.introduction}>
                <div className={styles.wrapper}>
                    <Stickers />
                    <h1>Qui sommes-nous?</h1>
                    <p>
                        Initialement sous le nom «Lausanne Funky Sunday», c’est en septembre 2018 que l’association
                        Funky Sundays voit le jour. Cette association fondée par un groupe d’amis, 16 anciens étudiants
                        de l&apos;EPFL à Lausanne et ayant démarré dans le cadre d’un cours de Gestion des
                        Organisations, avait pour but de mettre sur pied un festival de musique le dimanche.
                    </p>
                    <p>
                        Le dimanche 19 mai 2019, s’est tenu la première édition du festival qui a réuni près de 1’000
                        personnes un jour de pluie. Motivés par cette réussite et la joie provoquée sur le visage des
                        participants et des organisateurs, nous décidons de continuer l’aventure à Genève, désormais
                        sous le nom «Funky Sundays».
                    </p>
                    <p>
                        Les éditions suivantes en 2023 et 2024 ont connu un grand succès à la Plage des Eaux-Vives à
                        Genève. Ces événement d’envergure plus importante que le premier, ont rassemblé plus de 6’000
                        personnes sur de magnifiques journées ensoleillées, remplies de joie et de musique.
                    </p>
                </div>
            </section>
            <section className={styles.committee}>
                <div className={styles.wrapper}>
                    {data.staff.map((i) => (
                        <Employee key={i.id} data={i} />
                    ))}
                </div>
            </section>
        </>
    );
}
