import Button from "./Button";
import { SiFacebook, SiInstagram, SiSoundcloud, SiSpotify } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import styles from "@/style/Header.module.css";

export default function Header() {
    return (
        <header>
            <div className={styles.wrapper}>
                <Link href="/">
                    <svg
                        className={styles.logo}
                        viewBox="0 0 1200 1158"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M29.4755 439.095V248.527C29.4755 162.085 17.6853 59.9286 0 0H750.483L786.831 252.452C755.401 231.819 676.809 221.021 588.413 221.021H285.868V315.328H530.454C578.593 315.328 624.761 313.358 656.191 309.433V425.35C624.761 420.432 578.593 419.455 530.454 419.455H285.868V462.676C285.868 549.117 297.658 626.716 317.298 687.622H0.0150532C18.6779 626.716 29.4906 525.537 29.4906 439.095H29.4755Z" />
                        <path d="M380.761 1098.87L381.934 873.724C469.157 930.299 640.085 964.481 767.386 964.481C861.693 964.481 918.268 950.33 918.268 918.509C918.268 831.285 390.19 942.089 390.19 711.052C390.19 599.075 542.245 533.056 787.433 533.056C888.808 533.056 1039.69 553.087 1128.1 579.029L1138.7 787.673C1079.77 752.318 941.848 718.12 819.254 718.12C739.099 718.12 670.734 729.91 670.734 760.559C670.734 839.541 1200 741.7 1200 968.015C1200 1087.08 1062.08 1157.8 788.621 1157.8C674.283 1157.8 469.172 1125.98 380.776 1098.87H380.761Z" />
                    </svg>
                </Link>
                <span className={styles.socials}>
                    <Button
                        type="social"
                        href="https://www.instagram.com/funkysundays/"
                        platform="instagram"
                        icon={<SiInstagram color="currentColor" size={18} />}
                    />
                    <Button
                        type="social"
                        href="https://www.facebook.com/funkysundays8"
                        platform="facebook"
                        icon={<SiFacebook color="currentColor" size={18} />}
                    />
                    <Button
                        type="social"
                        href="https://soundcloud.com/funky-sundays"
                        platform="soundcloud"
                        icon={<SiSoundcloud color="currentColor" size={18} />}
                    />
                    <Button
                        type="social"
                        href="https://open.spotify.com/user/31s3sylgmhux5d7cvieinn5jv42y?nd=1&dlsi=0eb9b41e8b3749f0"
                        platform="spotify"
                        icon={<SiSpotify color="currentColor" size={18} />}
                    />
                </span>
            </div>
        </header>
    );
}
