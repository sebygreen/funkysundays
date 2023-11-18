import Image from "next/image";
import styles from "./page.module.css";
import PocketBase from "pocketbase";
import staffImage from "@/images/staff.jpg";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const pb = new PocketBase("http://127.0.0.1:8090");

async function fetchStaff() {
    try {
        const data = await pb.collection("staff").getFullList({
            fields: "id, collectionId, name, position, picture",
        });
        return data;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export default async function Page() {
    const staff = await fetchStaff();
    //console.log(staff);
    return (
        <div className={`wrapper ${styles.wrapper}`}>
            <h1>Qui sommes-nous?</h1>
            <p>
                Le dimanche 19 mai 2019, la première édition du festival a lieu au parc de Montbenon à Lausanne et
                réunit près de 1&apos;000 personnes un jour de pluie, ainsi que des artistes live de musique, des DJs,
                des foodtrucks et un brasseur de bière de la région.
            </p>
            <p>
                Ayant réalisé un réel succès à leurs yeux, les organisateurs ont souhaité porter le projet au-delà du
                cadre du cours et de la ville de Lausanne et d&apos;en faire un réel festival à récurrence annuelle.
            </p>
            <p>
                Après 2 années mouvementées par le départ et l&apos;arrivée de certains membres ainsi que la pandémie de
                COVID-19, l&apos;association Funky Sundays s&apos;installe à Genève et relance ses activités en 2022
                avec pour objectif de donner vie aux dimanches suisses avec de la musique, de la nourriture, des
                boissons et autres offres culturelles locales.
            </p>
            <p>
                La 2e édition du festival, prévue en septembre 2023, se déroulera à Genève et visera à promouvoir la
                culture locale et à réjouir la population genevoise de son dimanche ensoleillé et bercé par la
                programmation des Funky Sundays.
            </p>
            <Image
                className={styles.staffImage}
                src={staffImage}
                alt="Staff on duty in 2019."
                placeholder="blur"
            />
            <section
                id="staff"
                className={styles.staff}
            >
                <Suspense fallback={<Loading />}>
                    {staff.map((member) => (
                        <article key={member.id}>
                            <figure>
                                <Image
                                    src={`http://127.0.0.1:8090/api/files/${member.collectionId}/${member.id}/${member.picture}`}
                                    alt={member.name}
                                    fill={true}
                                    sizes="120px"
                                />
                            </figure>
                            <p>{member.name}</p>
                            <p>{member.position}</p>
                        </article>
                    ))}
                </Suspense>
            </section>
        </div>
    );
}
