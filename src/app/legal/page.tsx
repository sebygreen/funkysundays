import styles from "./page.module.css";
import { clsx } from "clsx";

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <h1>Mentions Légales</h1>
            <section id="company" className={styles.company}>
                <h2>Association</h2>
                <div className={styles.table}>
                    <div className={styles.row}>
                        <p>Type: </p>
                        <div className={styles.list}>
                            <p>Funky Sundays, association du type loi 1901 au siège social situé à Genève.</p>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <p>Contact: </p>
                        <div className={styles.list}>
                            <p>+41 40 22 23 11,</p>
                            <p>contact@funkysundays.com</p>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <p>Licences: </p>
                        <div className={styles.list}>
                            <p>L1 – PLATESV-R-2021-004671,</p>
                            <p>L2 – PLAV-R-2021-005,</p>
                            <p>L3 – PLAV-R-2021-082</p>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <p>SIRET: </p>
                        <div className={styles.list}>
                            <p>243539 23470 829 00059</p>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <p>Résponsable: </p>
                        <div className={styles.list}>
                            <p>Jan FROGG</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="hosting">
                <h2>Hébergement</h2>
                <p>
                    Ce site est hébergé avec <a href="https://www.ionos.fr/">IONOS</a> et le nom de domaine
                    &quot;funkysundays.com&quot; est enregistré chez{" "}
                    <a href="https://www.infomaniak.com/en">Infomaniak</a>.
                </p>
            </section>
            <section id="privacy" className={styles.privacy}>
                <h2>Politique de Confidentialité</h2>
                <div className={styles.group}>
                    <p>
                        Funky Sundays dont le siège est à Genève informe les utilisateurs du site internet
                        funkysundays.com, ainsi que ses clients, par la présente politique de confidentialité, des
                        traitements de données qu’elle réalise en tant que responsable de traitement.
                    </p>
                    <p>
                        En produisant des effets sur le territoire Suisse, le Funkys Sundays se conforme à la Loi
                        fédérale sur la protection des données du 25 septembre 2020.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>1. Champ d&apos;application</h3>
                    <p>
                        La présente politique de confidentialité (ci-après &quot;Politique&quot;), s’applique quel que
                        soit le moyen ou le support utilisé pour accéder à notre site internet et expose les conditions
                        dans lesquelles, lors de votre navigation, nous collectons, utilisons et conservons des
                        informations vous concernant, ainsi que les choix dont vous disposez s’agissant de la collecte,
                        l’utilisation et la divulgation de ces informations. Elle s’applique également à l’ensemble des
                        services que nous réalisons dans le cadre de nos activités.
                    </p>
                    <p>
                        En accédant au présent site internet ou en contractant avec nous, vous reconnaissez avoir lu,
                        compris et accepté d’être sujet aux conditions prévues par la présente Politique.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>2. Définitions</h3>
                    <p>
                        <span>Données personnelles</span>: toutes les informations concernant une personne physique
                        identifiée ou identifiable.
                    </p>
                    <p>
                        <span>Traitement</span>: toute opération relative à des données personnelles, quels que soient
                        les moyens et procédés utilisés, notamment la collecte, l’enregistrement, la conservation,
                        l’utilisation, la modification, la communication, l’archivage, l’effacement ou la destruction de
                        données.
                    </p>
                    <p>
                        <span>Responsable de traitement</span>: la personne privée ou l’organe fédéral qui, seul ou
                        conjointement avec d’autres, détermine les finalités et les moyens du traitement de données
                        personnelles.
                    </p>
                    <p>
                        <span>Sous-traitant</span>: la personne privée ou l’organe fédéral qui traite des données
                        personnelles pour le compte du responsable de traitement.
                    </p>
                    <p>
                        <span>Violation de la sécurité des données</span>: toute violation de la sécurité entraînant de
                        manière accidentelle ou illicite la perte de données personnelles, leur modification, leur
                        effacement ou leur destruction, leur divulgation ou un accès non autorisé à ces données.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>3. Utilisation du site</h3>
                </div>
                <div className={clsx(styles.group, styles.i1)}>
                    <h3>3.1 Données colléctées</h3>
                </div>
                <div className={clsx(styles.group, styles.i2)}>
                    <h3>3.1.1 Données de navigation</h3>
                    <p>
                        Lors de votre navigation sur notre site internet, nous sommes amenés à collecter les
                        informations suivantes vous concernant: <span>votre addresse IP</span>,{" "}
                        <span>la date et l’heure de votre visite</span>, <span>le navigateur utilisé</span>,{" "}
                        <span>les fabriquants de votre infrastructure internet</span>.
                    </p>
                </div>
                <div className={clsx(styles.group, styles.i2)}>
                    <h3>3.1.2 Données de contact</h3>
                    <p>
                        De plus, lorsque vous réalisez une demande de contact, nous collectons, avec votre consentement,
                        les informations suivantes: <span>votre nom et prénom</span>,{" "}
                        <span>votre addresse électronique</span>.
                    </p>
                </div>
                <div className={clsx(styles.group, styles.i1)}>
                    <h3>3.2 Finalités d’utilisation des données</h3>
                    <p>
                        En tant que responsable du traitement des données personnelles que nous collectons sur notre
                        site, cet article décrit les buts pour lesquels nous traitons vos données. Tous les buts
                        d’utilisation des données ne s’appliquent pas à tous les utilisateurs.
                    </p>
                </div>
                <div className={clsx(styles.group, styles.i2)}>
                    <h3>3.2.1 Fournitures de services</h3>
                    <p>Nous utilisons vos données de contact pour répondre à vos demandes de contact.</p>
                </div>
                <div className={clsx(styles.group, styles.i2)}>
                    <h3>3.2.2 Poursuite de nos intérêts légitimes</h3>
                    <p>
                        Vos données peuvent également être utilisées pour poursuivre nos intérêts légitimes, ce qui
                        inclut la surveillance de l’utilisation de notre site, ainsi que l’étude de toutes plaintes que
                        nous pourrions recevoir, de votre part ou de tierces personnes.
                    </p>
                </div>
                <div className={clsx(styles.group, styles.i1)}>
                    <h3>3.3 Cookies</h3>
                    <p>
                        Lorsque vous consultez notre site internet, des données peuvent être stockées dans votre
                        navigateur ou récupérées à partir de celui-ci, généralement sous la forme de cookies.
                    </p>
                    <p>
                        Ces informations peuvent porter sur vous, sur vos préférences ou sur votre appareil et sont
                        principalement utilisées pour s&apos;assurer que le site internet fonctionne correctement.
                    </p>
                    <p>
                        Nous vous informons qu’en naviguant sur notre site internet, ces types de cookies sont utilisés:
                    </p>
                </div>
                <div className={clsx(styles.group, styles.i2)}>
                    <h3>3.3.1 Cookies nécessaires</h3>
                    <p>
                        Ces cookies sont nécessaires au fonctionnement du site Web et ne peuvent pas être désactivés
                        dans nos systèmes. Ils sont généralement établis en tant que réponse à des actions que vous avez
                        effectuées et qui constituent une demande de services, telles que la connexion ou le remplissage
                        de formulaires. Vous pouvez configurer votre navigateur afin de bloquer ou être informé de
                        l&apos;existence de ces cookies, mais certaines parties du site internet peuvent être affectées.
                    </p>
                </div>
                <div className={clsx(styles.group, styles.i2)}>
                    <h3>3.3.2 Cookies de performance</h3>
                    <p>
                        Ces cookies nous permettent de déterminer le nombre de visites et les sources du trafic, afin de
                        mesurer et d’améliorer les performances de notre site internet. Ils nous aident également à
                        identifier les pages les plus ou moins visitées et d’évaluer comment les visiteurs naviguent sur
                        le site internet.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>4. Lorsque vous êtes clients</h3>
                </div>
                <div className={clsx(styles.group, styles.i1)}>
                    <h3>4.1 Données colléctées</h3>
                </div>
                <div className={clsx(styles.group, styles.i2)}>
                    <h3>4.1.1 Données d’identification</h3>
                    <p>
                        Lorsque vous contractez avec nous, nous collectons des informations permettant de vous
                        identifier telles que: <span>votre nom et prénom</span>, <span>votre addresse postale</span>,{" "}
                        <span>votre addresse électronique</span>.
                    </p>
                </div>
                <div className={clsx(styles.group, styles.i1)}>
                    <h3>4.2 Finalités</h3>
                    <p>
                        Dans le cadre de l’exécution de nos prestations de service, nous sommes amenés à traiter vos
                        données personnelles pour les objectifs suivants: <span>exécution contractuelle</span>,{" "}
                        <span>gestion de la comptabilité</span>.
                    </p>
                    <p>Nous précisons toutefois que tous les objectifs ne s’appliquent pas à tous les clients.</p>
                </div>
                <div className={styles.group}>
                    <h3>5. Catégories de destinataires</h3>
                </div>
                <div className={clsx(styles.group, styles.i1)}>
                    <h3>5.1 Transmission à des tiers</h3>
                    <p>
                        Nous pouvons transmettre vos données à des tiers si la loi ou la demande d’une autorité
                        judiciaire ou administrative l’exige, pour protéger nos droits ou nos intérêts.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>6. Sécurité et confidentialité des données</h3>
                    <p>
                        Nous avons mis en place des mesures adéquates de sécurité (d’ordre technique et organisationnel)
                        conformes aux exigences légales et aux règles de l’art compte tenu des risques encourus pour
                        protéger vos données contre toute manipulation accidentelle ou intentionnelle, perte,
                        destruction, communication ou contre tout accès non autorisé.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>7. Communications à l’étranger</h3>
                    <p>
                        Vos données peuvent faire l’objet d’un traitement dans les pays suivants: <span>France</span>.
                    </p>
                    <p>
                        Ces communications à l’étranger sont encadrées par une des garanties prévues à l’art. 16 al. 2
                        de la nLPD, assurant ainsi la sécurité de vos données personnelles:{" "}
                        <span>un traité international</span>.
                    </p>
                    <p>
                        Cependant en cas de transfert à des tiers établis dans des pays qui n’assurent pas un niveau de
                        protection des données suffisant, nous prendrons des mesures de protection appropriées, comme la
                        signature de clauses contractuelles types.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>8. Vos droits</h3>
                    <p>
                        Vous avez la possibilité de nous demander <span>l’accès</span>, <span>la rectification</span>,{" "}
                        <span>la transmission</span> ou <span>l’effacement</span> de vos données personnelles.
                    </p>
                    <p>
                        Pour exercer vos droits, veuillez nous contacter aux coordonnées indiquées au paragraphe
                        &quot;Contact&quot;.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>9. Contact</h3>
                    <p>
                        Pour toute question relative à la présente Politique, aux traitements de données personnelles
                        que nous réalisons ou pour exercer vos droits individuels, veuillez nous contacter à l’adresse
                        suivante: <span>contact@funkysundays.com</span>.
                    </p>
                </div>
                <div className={styles.group}>
                    <h3>10. Mise à jour</h3>
                    <p>
                        Cette Politique peut être modifiée en fonction des évolutions légales, opération- nelles et
                        stratégiques. Toute mise à jour sera consultable sur cette même page. Veuillez donc la vérifier
                        régulièrement.
                    </p>
                </div>
            </section>
        </div>
    );
}
