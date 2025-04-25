import { clsx } from "clsx";
import styles from "@/style/common/Anchor.module.css";
import Link from "next/link";
import { ReactNode } from "react";

interface AnchorProps {
    type: "anchor" | "route";
    href: string;
    color?: "default" | "white";
    children: ReactNode;
    active?: boolean;
    target?: string;
}

export default function Anchor({ type, href, color = "default", children, active, target }: AnchorProps) {
    switch (type) {
        case "anchor":
            return (
                <a
                    href={href}
                    className={clsx(styles.container, styles[type], styles[color], active && styles.active)}
                    target={target}
                >
                    {children}
                </a>
            );
        case "route":
            return (
                <Link
                    href={href}
                    className={clsx(styles.container, styles.route, styles[color], active && styles.active)}
                    target={target}
                >
                    {children}
                </Link>
            );
        default:
            return null;
    }
}
