import styles from "@/style/Loader.module.css";

export default function Loader({ page }: { page?: boolean }) {
    return (
        <div className={page ? styles.page : undefined}>
            <div className={styles.container}>
                <div className={styles.dot}></div>
                <div className={styles.traveler}></div>
            </div>
            <svg width="0" height="0" className={styles.svg}>
                <defs>
                    <filter id="uib-jelly-triangle-ooze">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3.333" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                            result="ooze"
                        />
                        <feBlend in="SourceGraphic" in2="ooze" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
}
