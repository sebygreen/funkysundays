import Link from "next/link";
import { Small } from "@/components/svg/Logo";
import styles from "@/style/layout/Header.module.css";
import Button from "@/components/common/Button";
import { FacebookLogo, InstagramLogo, SoundcloudLogo, SpotifyLogo } from "@phosphor-icons/react/dist/ssr";

export default function Header() {
    return (
        <header className={styles.container}>
            <div className={styles.wrapper}>
                <Link href="/" className={styles.logo}>
                    <Small />
                </Link>
                <div className={styles.socials}>
                    <Button
                        type="anchor"
                        url="https://instagram.com/funkysundays/"
                        target="_blank"
                        color="instagram"
                        icon={<InstagramLogo />}
                    />
                    <Button
                        type="anchor"
                        url="https://facebook.com/funkysundays8"
                        target="_blank"
                        color="facebook"
                        icon={<FacebookLogo />}
                    />
                    <Button
                        type="anchor"
                        url="https://soundcloud.com/funky-sundays"
                        target="_blank"
                        color="soundcloud"
                        icon={<SoundcloudLogo />}
                    />
                    <Button
                        type="anchor"
                        target="_blank"
                        url="https://open.spotify.com/user/31s3sylgmhux5d7cvieinn5jv42y?nd=1&dlsi=0eb9b41e8b3749f0"
                        color="spotify"
                        icon={<SpotifyLogo />}
                    />
                </div>
            </div>
        </header>
    );
}
