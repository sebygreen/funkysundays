import Link from "next/link";
import styles from "@/style/Button.module.css";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

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
                {icon && icon}
                {text && <p>{text}</p>}
            </Link>
        );
    } else if (type === "anchor") {
        return (
            <a
                href={href}
                className={`${styles.anchor} ${buttonClass(icon, text)}`}
            >
                {icon && icon}
                {text && <p>{text}</p>}
            </a>
        );
    } else if (type === "button") {
        return (
            <button
                onClick={action}
                className={`${styles.button} ${buttonClass(icon, text)}`}
            >
                {icon && icon}
                {text && <p>{text}</p>}
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
                {icon && icon}
                {text && <p>{text}</p>}
            </a>
        );
    }
}
