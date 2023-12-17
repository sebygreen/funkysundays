import Image from "next/image";
import styles from "./page.module.css";
import PocketBase from "pocketbase";
import staffImage from "@/images/staff.jpg";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import IconBird from "@/components/icons/IconBird";
import { fetchStaff } from "@/lib/fetch";

export default async function About() {
    const staff = await fetchStaff();
    return (
        <div className={`wrapper ${styles.wrapper}`}>
            <section className={styles.header}>
                <div>
                    <IconBird />
                    <h1>Qui sommes-nous?</h1>
                </div>
                <Image
                    className={styles.staffImage}
                    src={staffImage}
                    alt="Staff on duty in 2019."
                    placeholder="blur"
                />
            </section>
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
            <section
                id="staff"
                className={styles.staff}
            >
                <Suspense fallback={<Loading />}>
                    {staff.map((member) => (
                        <article key={member.id}>
                            <figure>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${member.collectionId}/${member.id}/${member.picture}`}
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
