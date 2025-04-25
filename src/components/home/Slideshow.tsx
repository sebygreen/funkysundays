"use client";

import styles from "@/style/home/Slideshow.module.css";
import slide1 from "@/images/gallery/slide1.jpg";
import slide2 from "@/images/gallery/slide2.jpeg";
import slide3 from "@/images/gallery/slide3.jpeg";
import slide4 from "@/images/gallery/slide4.jpeg";
import slide5 from "@/images/gallery/slide5.jpg";
import slide6 from "@/images/gallery/slide6.jpg";
import slide7 from "@/images/gallery/slide7.jpg";
import slide8 from "@/images/gallery/slide8.jpg";
import slide9 from "@/images/gallery/slide9.jpg";
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
import { motion, useAnimate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function Slideshow() {
    const slides = [
        slide1,
        slide2,
        slide3,
        slide4,
        slide5,
        slide6,
        slide7,
        slide8,
        slide9,
        slide10,
        slide11,
        slide12,
        slide13,
        slide14,
        slide15,
        slide16,
        slide17,
        slide18,
    ];
    const [scope, animate] = useAnimate();
    const x = useMotionValue(0);

    useEffect(() => {
        async function loop() {
            if (!scope.current) return;
            const first = scope.current.firstElementChild;
            await animate(x, -first.clientWidth, {
                ease: "linear",
                duration: 20,
                onUpdate: (l) => x.set(l),
                onComplete: () => {
                    scope.current.appendChild(first);
                    x.set(0);
                },
            });
            void loop();
        }

        if (scope.current) void loop();
    }, [animate, scope, x]);

    return (
        <section id="gallery" className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.display}>
                    <motion.div className={styles.overflow} ref={scope} style={{ translateX: x }}>
                        {slides.map((slide, index) => (
                            <Image key={index} src={slide} alt={`Slide #${index}`} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
