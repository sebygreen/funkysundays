"use client";

import styles from "@/style/home/Slideshow.module.css";
import slide01 from "@/images/gallery/slide01.jpg";
import slide02 from "@/images/gallery/slide02.jpeg";
import slide03 from "@/images/gallery/slide03.jpeg";
import slide04 from "@/images/gallery/slide04.jpeg";
import slide05 from "@/images/gallery/slide05.jpg";
import slide06 from "@/images/gallery/slide06.jpg";
import slide07 from "@/images/gallery/slide07.jpg";
import slide08 from "@/images/gallery/slide08.jpg";
import slide09 from "@/images/gallery/slide09.jpg";
import slide10 from "@/images/gallery/slide10.jpg";
import slide11 from "@/images/gallery/slide11.jpg";
import slide12 from "@/images/gallery/slide12.jpg";
import slide13 from "@/images/gallery/slide13.jpg";
import slide14 from "@/images/gallery/slide14.jpg";
import slide15 from "@/images/gallery/slide15.jpg";
import slide16 from "@/images/gallery/slide16.jpg";
import slide17 from "@/images/gallery/slide17.jpg";
import slide18 from "@/images/gallery/slide18.jpg";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";

export default function Slideshow() {
    const slides = useRef([
        slide01,
        slide02,
        slide03,
        slide04,
        slide05,
        slide06,
        slide07,
        slide08,
        slide09,
        slide10,
        slide11,
        slide12,
        slide13,
        slide14,
        slide15,
        slide16,
        slide17,
        slide18,
    ]);
    const root = useRef<HTMLDivElement>(null);
    const [slide, setSlide] = useState<number>(0);

    useEffect(() => {
        const container = root.current;
        if (!container) return;
        const first = container.firstElementChild;
        if (!first) return;
        const travel = -first.clientWidth;
        const motion = animate(
            container,
            { x: [0, travel] },
            {
                duration: 15,
                ease: "linear",
                onComplete: () => {
                    const end = slide === slides.current.length;
                    setSlide(end ? 0 : slide + 1);
                },
            },
        );
        return () => {
            if (motion.state !== "finished") motion.complete();
            container.appendChild(first);
            container.style.transform = `translateX(0px)`;
        };
    }, [slide]);

    return (
        <section id="gallery" className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.counter}>
                    <p>
                        {slide + 1}
                        <span>/{slides.current.length}</span>
                    </p>
                </div>
                <div className={styles.display}>
                    <div className={styles.overflow} ref={root}>
                        {slides.current.map((slide, index) => (
                            <Image key={index} src={slide} alt={`Slide #${index}`} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
