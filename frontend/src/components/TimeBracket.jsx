import { jetBrainsMono } from "@/lib/fonts";
import dayjs from "dayjs";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/TimeBracket.module.css";

export default function TimeBracket({ start, end }) {
    return (
        <div className={styles.container}>
            <p className={jetBrainsMono.className}>{start.format("HH:mm")}</p>
            <ArrowRight
                size={14}
                weight="bold"
            />
            <p className={jetBrainsMono.className}>{start.format("HH:mm")}</p>
        </div>
    );
}
