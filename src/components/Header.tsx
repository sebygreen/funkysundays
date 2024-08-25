import Link from "next/link";
import { Small } from "@/components/svg/Logo";
import styles from "@/style/Header.module.css";
import Button from "@/components/Button";

export default function Header() {
    return (
        <header>
            <div className={styles.wrapper}>
                <Link href={"/"} className={styles.logo}>
                    <Small />
                </Link>
                <div className={styles.socials}>
                    <Button type="social" href="https://instagram.com/funkysundays/" platform="instagram" />
                    <Button type="social" href="https://facebook.com/funkysundays8" platform="facebook" />
                    <Button type="social" href="https://soundcloud.com/funky-sundays" platform="soundcloud" />
                    <Button
                        type="social"
                        href="https://open.spotify.com/user/31s3sylgmhux5d7cvieinn5jv42y?nd=1&dlsi=0eb9b41e8b3749f0"
                        platform="spotify"
                    />
                </div>
            </div>
        </header>
    );
}
