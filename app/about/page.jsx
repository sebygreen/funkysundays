import Image from "next/image";
import styles from "./page.module.css";
import picture from "@/images/staff.jpg";
import { staff } from "@/lib/fetch";
import Stamp from "@/components/Stamp";
import Employee from "@/components/Employee";

export const revalidate = 3600;

export const metadata = {
    title: "À Propos",
};

export default async function About() {
    let data = await staff.all();
    let committee = [];
    let members = [];
    data.forEach((i) => {
        i.status === "Comité" ? committee.push(i) : members.push(i);
    });
    return (
        <div className="constrain spaced">
            <section className={styles.stamped}>
                <Stamp />
                <Image
                    className={styles.picture}
                    src={picture}
                    alt="Staff photo of 2023"
                    placeholder="blur"
                />
            </section>
            <section className="spaced">
                <h1>Qui sommes-nous?</h1>
                <p>
                    Initialement sous le nom «Lausanne Funky Sunday», c’est en
                    septembre 2018 que l’association Funky Sundays voit le jour.
                    Cette association fondée par un groupe d’amis, 16 anciens
                    étudiants de l’EPFL à Lausanne et ayant démarré dans le
                    cadre d’un cours de Gestion des Organisations, avait pour
                    but de mettre sur pied un festival de musique le dimanche.
                </p>
                <p>
                    Le dimanche 19 mai 2019, s’est tenu la première édition du
                    festival qui a réuni près de 1’000 personnes un jour de
                    pluie. Motivés par cette réussite et la joie provoquée sur
                    le visage des participants et des organisateurs, nous
                    décidons de continuer l’aventure à Genève, désormais sous le
                    nom «Funky Sundays».
                </p>
                <p>
                    La deuxième édition a connu un grand succès le dimanche 24
                    septembre 2023, à la Plage des Eaux-Vives à Genève et après
                    une longue pause dû à la pandémie de COVID-19. L’événement,
                    d’envergure plus importante que le premier, a rassemblé plus
                    de 3’000 personnes sur une magnifique journée ensoleillée,
                    remplie de joie et de musique.
                </p>
                <p>
                    La famille Funky Sundays compte aujourd’hui 12 membres
                    bénévoles et nous sommes motivés à créer ensemble le
                    meilleur rendez-vous dominical de l’année pour toutes et
                    tous.
                </p>
            </section>
            <section id="commitee" className={styles.committee}>
                {committee.map((i) => (
                    <Employee key={i.id} employee={i} />
                ))}
            </section>
            <section id="members" className={styles.members}>
                {members.map((i) => (
                    <Employee key={i.id} employee={i} />
                ))}
            </section>
        </div>
    );
}
