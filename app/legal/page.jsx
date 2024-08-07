import styles from "./page.module.css";

export const metadata = {
    title: "Mentions Légales",
};

export default function Page() {
    return (
        <main>
            <div className={styles.wrapper}>
                <h1>Mentions Légales</h1>
                <section>
                    <h2>Festival</h2>
                    <ul>
                        <li>
                            Nom de l’entreprise ou de l’organisation: <span>Funky Sundays</span>
                        </li>
                        <li>
                            Prénom et nom de la personne responsable: <span>Jan FROGG</span>
                        </li>
                        <li>
                            Adresse postale complète: <span>Rue de Montchoisy 7, 1207 Genève, Suisse</span>
                        </li>
                        <li>
                            Adresse e-mail: <span>jan.frogg@funkysundays.com</span>
                        </li>
                        <li>
                            Statut juridique: <span>Association à but non lucratif</span>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2>Hébergeur</h2>
                    <p>
                        Le site internet est hébergé chez:{" "}
                        <a target="_blank" className="small" href="https://ionos.fr">
                            IONOS
                        </a>
                        .
                    </p>
                    <p>
                        Registrar de &apos;funkysundays.com&apos;:{" "}
                        <a target="_blank" className="small" href="https://infomaniak.com">
                            Infomaniak
                        </a>
                        .
                    </p>
                </section>
                <h2>Cookies & Politique de Confidentialité</h2>
                <section>
                    <h3>Cookies</h3>
                    <p>
                        Un cookie est un fichier texte de petite taille, stocké sur le terminal de l’internaute lors de
                        la consultation d’un site internet. Le cookie a pour but de collecter des informations relatives
                        à votre navigation et permet d’adresser des services adaptés à votre terminal et de
                        personnaliser les annonces présentes sur certains sites. Les cookies ont un rôle important pour
                        votre expérience de navigation. Les cookies sont gérés par votre navigateur internet et sont
                        anonymes.
                    </p>
                    <p>
                        Chez Funky Sundays, nous ne collectons pas de données personnelles et nous n’utilisons pas de
                        cookies.
                    </p>
                </section>
                <section>
                    <h3>Contenu Embarqué</h3>
                    <p>
                        Les pages de ce site peuvent inclure des contenus intégrés (Youtube, Spotify). Le contenu
                        intégré depuis d’autres sites se comporte de la même manière que si vous visitiez ces sites. Ces
                        sites web peuvent collecter des données sur vous, utiliser des cookies, embarquer des outils de
                        suivis tiers et suivre vos interactions avec ces contenus embarqués si vous disposez d’un compte
                        connecté sur leur site web.
                    </p>
                </section>
            </div>
        </main>
    );
}
