import Link from "next/link";
import styles from "@/style/button.module.css";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";

export default function Button({ type, url, action, icon, text, platform }) {
    function Base({ type, url, children }) {
        let buttonClass;
        if (!icon) {
            buttonClass = `${styles.button} ${styles.text}`;
        } else if (!text) {
            buttonClass = `${styles.button} ${styles.icon}`;
        } else {
            buttonClass = `${styles.button} ${styles.normal}`;
        }
        if (type === "link") {
            return (
                <a
                    className={buttonClass}
                    href={url}
                >
                    {children}
                </a>
            );
        } else if (type === "route") {
            return (
                <Link
                    className={buttonClass}
                    href={url}
                >
                    {children}
                </Link>
            );
        } else if (type === "button") {
            return (
                <button
                    className={buttonClass}
                    onClick={action}
                >
                    {children}
                </button>
            );
        } else if (type === "social") {
            return (
                <a
                    className={`${buttonClass} ${styles[`${platform}`]}`}
                    href={url}
                >
                    {children}
                </a>
            );
        }
    }

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
        <Base
            type={type}
            url={url}
        >
            {icon}
            {text}
        </Base>
    );
}
