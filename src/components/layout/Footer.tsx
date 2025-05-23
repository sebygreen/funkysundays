import styles from "@/style/layout/Footer.module.css";
import { djs } from "@/utilities/tools";
import Anchor from "@/components/common/Anchor";

export default function Footer() {
    return (
        <footer className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.copyright}>
                    <p>&copy; Funky Sundays {djs().year()}</p>
                    <Anchor type="route" href="/legal">
                        Mentions Légales
                    </Anchor>
                </div>
                <div className={styles.captcha}>
                    <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M128 63.7239C127.997 62.8061 127.976 61.8932 127.935 60.9847V9.18849L113.615 23.508C101.895 9.16258 84.0667 0 64.0971 0C43.3152 0 24.8526 9.91961 13.1816 25.2817L36.653 49C38.9533 44.7459 42.2209 41.0921 46.1609 38.3325C50.2586 35.1347 56.0647 32.5202 64.0963 32.5202C65.0666 32.5202 65.8155 32.6335 66.3657 32.8471C76.3169 33.6326 84.9426 39.1244 90.0215 47.0953L73.4073 63.7095C94.4513 63.627 118.224 63.5785 127.998 63.7202"
                            fill="#1C3AA9"
                        />
                        <path
                            d="M63.7239 0.00228119C62.8061 0.00532883 61.8932 0.0265101 60.9847 0.0676532H9.18849L23.508 14.3871C9.16258 26.1069 0 43.9356 0 63.9052C0 84.6871 9.91977 103.15 25.2817 114.821L49 91.3492C44.7459 89.049 41.0921 85.7813 38.3325 81.8414C35.1349 77.7436 32.5202 71.9376 32.5202 63.906C32.5202 62.9357 32.6335 62.1868 32.8471 61.6366C33.6326 51.6854 39.1244 43.0597 47.0953 37.9808L63.7095 54.595C63.6269 33.551 63.5783 9.77789 63.7202 0.00410935"
                            fill="#4285F4"
                        />
                        <path
                            d="M0.00219727 63.9037C0.00524491 64.8215 0.0264261 65.7344 0.0675693 66.6429V118.439L14.3871 104.12C26.1068 118.465 43.9355 127.628 63.9051 127.628C84.687 127.628 103.15 117.708 114.821 102.346L91.3491 78.6276C89.0489 82.8817 85.7813 86.5355 81.8413 89.2951C77.7436 92.4929 71.9375 95.1074 63.9059 95.1074C62.9356 95.1074 62.1867 94.994 61.6365 94.7804C51.6853 93.995 43.0596 88.5032 37.9807 80.5323L54.5949 63.918C33.5509 64.0006 9.77781 64.0491 0.00402833 63.9074"
                            fill="#ABABAB"
                        />
                    </svg>
                    <div className={styles.notice}>
                        <p>
                            <span>Protégé par ReCAPTCHA</span>
                        </p>
                        <p>
                            <Anchor type="anchor" href="https://policies.google.com/privacy">
                                Confidentialité
                            </Anchor>{" "}
                            <span>–</span>{" "}
                            <Anchor type="anchor" href="https://policies.google.com/terms">
                                Conditions
                            </Anchor>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
