"use client";

import parse, { attributesToProps, Element, HTMLReactParserOptions } from "html-react-parser";
import { EmbedBase } from "@/types";
import { useState } from "react";
import Loader from "@/components/common/Loader";
import styles from "@/style/artists/Embed.module.css";

export default function Embed({ data }: { data: EmbedBase }) {
    const [loading, setLoading] = useState<boolean>(true);
    const options: HTMLReactParserOptions = {
        replace(domNode) {
            if ((domNode as Element).attribs && (domNode as Element).name === "iframe") {
                const props = attributesToProps((domNode as Element).attribs);
                return <iframe {...props} onLoad={() => setLoading(false)} />;
            }
        },
    };
    return (
        <div className={styles.container}>
            {loading && (
                <div className={`${styles.loading} ${styles[data.platform]}`}>
                    <Loader />
                </div>
            )}
            {parse(data.html, options)}
        </div>
    );
}
