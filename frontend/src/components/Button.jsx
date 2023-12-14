import Link from "next/link";
import styles from "@/style/Button.module.css";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import { satoshi } from "@/lib/fonts";

function buttonClass(icon, text) {
    if (icon && text) {
        return styles.full;
    } else if (icon && !text) {
        return styles.icon;
    } else if (!icon && text) {
        return styles.text;
    }
}

function platformClass(platform) {
    if (platform === "instagram") {
        return styles.instagram;
    } else if (platform === "facebook") {
        return styles.facebook;
    } else {
        return undefined;
    }
}

export default function Button({ type, platform, icon, text, href, action }) {
    if (type === "route") {
        return (
            <Link
                href={href}
                className={`${styles.route} ${buttonClass(icon, text)}`}
            >
                {text && <p className={satoshi.className}>{text}</p>}
                {icon && icon}
            </Link>
        );
    } else if (type === "anchor") {
        return (
            <a
                href={href}
                className={`${styles.anchor} ${buttonClass(icon, text)}`}
            >
                {text && <p className={satoshi.className}>{text}</p>}
                {icon && icon}
            </a>
        );
    } else if (type === "button") {
        return (
            <button
                onClick={action}
                className={`${styles.button} ${buttonClass(icon, text)}`}
            >
                {text && <p className={satoshi.className}>{text}</p>}
                {icon && icon}
            </button>
        );
    } else if (type === "social") {
        if (platform === "instagram") {
            icon = (
                <SiInstagram
                    size={18}
                    color="currentColor"
                />
            );
        } else if (platform === "facebook") {
            icon = (
                <SiFacebook
                    size={18}
                    color="currentColor"
                />
            );
        }
        return (
            <a
                href={href}
                className={`${styles.anchor} ${buttonClass(icon, text)} ${platformClass(platform)}`}
            >
                {text && <p>{text}</p>}
                {icon && icon}
            </a>
        );
    }
}
