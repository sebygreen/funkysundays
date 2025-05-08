"use client";

import styles from "@/style/about/Employee.module.css";
import { User } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { StaffBase } from "@/types";
import { MouseEvent, useRef } from "react";

export default function Employee({ data }: { data: StaffBase }) {
    const html = useRef<HTMLDivElement>(null);

    function handleMouseMove(e: MouseEvent) {
        if (!html.current) return;
        let x = e.pageX - html.current.offsetLeft;
        let y = e.pageY - html.current.offsetTop;
        html.current.style.setProperty("--x", x + "px");
        html.current.style.setProperty("--y", y + "px");
    }

    return (
        <article ref={html} onMouseMove={handleMouseMove} key={data.id} className={styles.container}>
            <div>
                <figure>
                    {data.picture ?
                        <Image src={data.picture.url} alt={data.name} fill={true} sizes="120px" />
                    :   <User />}
                </figure>
                <p className={styles.name}>{data.name}</p>
            </div>
            <ul>
                {data.position.map((i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
        </article>
    );
}
