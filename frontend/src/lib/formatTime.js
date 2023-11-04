import dayjs from "dayjs";

export default function formatTime(date, formatting) {
    if (formatting === "time-only") {
        return dayjs(date).format("HH:mm");
    } else {
        return dayjs(date).format("LL HH:mm");
    }
}
