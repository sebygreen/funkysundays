import { HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode } from "react";
import styles from "@/style/common/Button.module.css";
import Link from "next/link";
import { clsx } from "clsx";

interface Base {
    color: "primary" | "secondary" | "instagram" | "facebook" | "snapchat" | "spotify" | "soundcloud";
    icon?: ReactNode;
    text?: string;
    disabled?: boolean;
}

interface Action extends Base {
    type: "action";
    onClick?: MouseEventHandler;
}

interface Anchor extends Base {
    type: "anchor";
    url: string;
    target?: HTMLAttributeAnchorTarget;
}

interface Route extends Base {
    type: "route";
    url: string;
}

interface Submit extends Base {
    type: "submit";
}

type ButtonProps = Action | Anchor | Route | Submit;

export default function Button({ ...props }: ButtonProps) {
    const variant =
        props.text && props.icon ? styles.full
        : !props.text && props.icon ? styles.icon
        : styles.text;
    switch (props.type) {
        case "action":
            return (
                <button
                    className={clsx(styles.button, variant, styles[props.color], styles[props.type])}
                    disabled={props.disabled}
                    onClick={props.onClick}
                >
                    {props.text && props.text}
                    {props.icon && props.icon}
                </button>
            );
        case "anchor":
            return (
                <a
                    href={props.url}
                    target={props.target}
                    className={clsx(
                        styles.button,
                        variant,
                        styles[props.color],
                        styles[props.type],
                        props.disabled && styles.disabled,
                    )}
                >
                    {props.text && props.text}
                    {props.icon && props.icon}
                </a>
            );
        case "route":
            return (
                <Link
                    href={props.url}
                    className={clsx(
                        styles.button,
                        variant,
                        styles[props.color],
                        styles[props.type],
                        props.disabled && styles.disabled,
                    )}
                >
                    {props.text && props.text}
                    {props.icon && props.icon}
                </Link>
            );
        case "submit":
            return (
                <button
                    type="submit"
                    className={clsx(styles.button, variant, styles[props.color], styles[props.type])}
                    disabled={props.disabled}
                >
                    {props.text && props.text}
                    {props.icon && props.icon}
                </button>
            );
    }
}
