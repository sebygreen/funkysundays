import Link from "next/link";
import styles from "@/style/Button.module.css";

function variant(icon, text) {
    if (icon && text) {
        return styles.full;
    } else if (icon && !text) {
        return styles.icon;
    } else if (!icon && text) {
        return styles.text;
    }
}

export default function Button({ type, icon, text, href, action, platform, disabled }) {
    if (type === "route") {
        //text, icon, href
        return (
            <Link href={href} className={`${styles.anchor} ${variant(icon, text)}`}>
                {text && <p>{text}</p>}
                {icon && icon}
            </Link>
        );
    } else if (type === "anchor") {
        //text, icon, href
        return (
            <a href={href} target="_blank" className={`${styles.anchor} ${variant(icon, text)}`}>
                {text && <p>{text}</p>}
                {icon && icon}
            </a>
        );
    } else if (type === "button") {
        //text, icon, action
        return (
            <button onClick={action} className={`${styles.button} ${variant(icon, text)}`}>
                {text && <p>{text}</p>}
                {icon && icon}
            </button>
        );
    } else if (type === "submit") {
        //text, icon, disabled
        return (
            <button type="submit" className={`${styles.button} ${variant(icon, text)}`} disabled={disabled}>
                {text && <p>{text}</p>}
                {icon && icon}
            </button>
        );
    } else if (type === "social") {
        //text, icon, href, platform
        return (
            <a href={href} target="_blank" className={`${styles.anchor} ${variant(icon, text)} ${styles[platform]}`}>
                {text && <p>{text}</p>}
                {icon && icon}
            </a>
        );
    }
}
