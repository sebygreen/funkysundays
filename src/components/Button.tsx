import { ReactNode } from "react";
import styles from "@/style/Button.module.css";
import Link from "next/link";
import { SiFacebook, SiInstagram, SiSnapchat, SiSoundcloud, SiSpotify } from "@icons-pack/react-simple-icons";

interface Action {
    type: "action";
    icon: ReactNode;
    color: "primary" | "secondary";
    disabled?: never;
    platform?: never;
    text?: string;
    click?: () => void;
    href?: never;
    target?: never;
}

interface Submit {
    type: "submit";
    icon: ReactNode;
    color: "primary" | "secondary";
    disabled?: boolean;
    platform?: never;
    text?: string;
    click?: () => void;
    href?: never;
    target?: never;
}

interface Route {
    type: "route";
    icon: ReactNode;
    color: "primary" | "secondary";
    disabled?: never;
    platform?: never;
    text?: string;
    click?: never;
    href?: string;
    target?: string;
}

interface Anchor {
    type: "anchor";
    icon: ReactNode;
    color: "primary" | "secondary";
    disabled?: never;
    platform?: never;
    text?: string;
    click?: never;
    href?: string;
    target?: string;
}

interface Social {
    type: "social";
    icon?: never;
    color?: never;
    disabled?: never;
    platform: "instagram" | "facebook" | "snapchat" | "spotify" | "soundcloud";
    text?: string;
    click?: never;
    href?: string;
    target?: string;
}

export default function Button({
    type,
    icon,
    text,
    color,
    disabled,
    platform,
    click,
    href,
    target,
}: Action | Submit | Route | Anchor | Social) {
    let variant: string[] = [styles.button, styles[type]];
    !!text ? variant.push(styles.full) : variant.push(styles.icon);
    type === "social" ? variant.push(styles[platform]) : variant.push(styles[color]);

    switch (type) {
        case "action":
            return (
                <button className={variant.join(" ")} onClick={click!}>
                    {!!text && text}
                    {icon}
                </button>
            );
        case "submit":
            return (
                <span className={disabled ? styles.disabled : undefined}>
                    <button className={variant.join(" ")} onClick={click!} disabled={disabled}>
                        {!!text && text}
                        {icon}
                    </button>
                </span>
            );
        case "route":
            return (
                <Link className={variant.join(" ")} href={href!}>
                    {!!text && text}
                    {icon}
                </Link>
            );
        case "anchor":
            return (
                <a className={variant.join(" ")} href={href!} target={target!}>
                    {!!text && text}
                    {icon}
                </a>
            );
        case "social":
            return (
                <a className={variant.join(" ")} href={href!} target={target!}>
                    {!!text && text}
                    {platform === "facebook" ?
                        <SiFacebook />
                    : platform === "instagram" ?
                        <SiInstagram />
                    : platform === "spotify" ?
                        <SiSpotify />
                    : platform === "soundcloud" ?
                        <SiSoundcloud />
                    :   platform === "snapchat" && <SiSnapchat />}
                </a>
            );
    }
}
