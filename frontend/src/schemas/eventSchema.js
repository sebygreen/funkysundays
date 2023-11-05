import dayjs from "dayjs";

export default function EventSchema(event) {
    this.id = event.id;
    this.name = event.name;
    this.start = dayjs(event.start);
    this.end = dayjs(event.end);
    this.days = this.end.diff(this.start, "day") + 1;
    this.category = event.category;
    if (event.expand) {
        if (event.expand["schedule(event)"]) {
            this.schedule = event.expand["schedule(event)"].map((set) => ({
                id: set.id,
                start: dayjs(set.start),
                end: dayjs(set.end),
                day: this.start.format("LL"),
                artistName: set.expand.artist.name,
            }));
        }
    }
}
