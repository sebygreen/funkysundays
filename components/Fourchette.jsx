import { jetBrainsMono } from "@/lib/fonts";
import dayjs from "dayjs";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "@/style/Fourchette.module.css";

export default function Fourchette({ start, end }) {
    return (
        <div className={styles.container}>
            <p className={jetBrainsMono.className}>{dayjs.utc(start).format("HH:mm")}</p>
            <ArrowRight size={14} weight="bold" />
            <p className={jetBrainsMono.className}>{dayjs.utc(end).format("HH:mm")}</p>
        </div>
    );
}
