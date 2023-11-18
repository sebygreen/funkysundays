import { jetBrainsMono } from "@/lib/localFonts";
import dayjs from "dayjs";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import formatTime from "@/lib/formatTime";
import styles from "@/style/timeBracket.module.css";

export default function TimeBracket({ start, end }) {
    return (
        <div className={styles.container}>
            <p className={jetBrainsMono.className}>{formatTime(start, "time-only")}</p>
            <ArrowRight
                size={14}
                weight="bold"
            />
            <p className={jetBrainsMono.className}>{formatTime(end, "time-only")}</p>
        </div>
    );
}
