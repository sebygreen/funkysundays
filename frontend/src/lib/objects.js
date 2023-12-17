import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export function Artist(artist, options = { expanded: false }) {
    this.id = artist.id;
    this.thumbnail = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${artist.collectionId}/${this.id}/${artist.thumbnail}`;
    this.name = artist.name;
    this.type = artist.type;

    if (options.expanded) {
        this.description = artist.description;
        if (artist.expand) {
            if (artist.expand.links) {
                this.links = artist.expand.links.map((link) => new Link(link));
            }
            if (artist.expand["schedule(artist)"]) {
                var upcoming = artist.expand["schedule(artist)"].find((event) => event.start > dayjs().format());
                if (upcoming) {
                    this.event = new Event(upcoming, { artist: true });
                }
            }
        }
    }
}

export function Event(event, options = { expanded: false, artist: false }) {
    this.id = options.artist ? event.expand.event.id : event.id;
    this.name = options.artist ? event.expand.event.name : event.name;
    this.start = dayjs(event.start);
    this.category = options.artist ? event.expand.event.category : event.category;

    if (options.expanded) {
        this.end = dayjs(event.end);
        this.multipleDays = this.end.isAfter(this.start, "day");
        this.location = event.location;
        this.attendees = event.attendees ? event.attendees : "-";
        this.poster = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${event.collectionId}/${this.id}/${event.poster}`;
        if (event.expand) {
            if (event.expand.sponsors) {
                this.sponsors = event.expand.sponsors.map((sponsor) => new Sponsor(sponsor));
            }
            if (event.expand["schedule(event)"]) {
                this.schedule = event.expand["schedule(event)"].map((set) => new Set(set));
            }
        }
    }
}

export function Sponsor(sponsor) {
    this.name = sponsor.name;
    this.logo = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${sponsor.collectionId}/${sponsor.id}/${sponsor.logo}`;
    this.url = sponsor.url;
}

export function Set(set) {
    this.id = set.id;
    this.start = dayjs(set.start);
    this.end = dayjs(set.end);
    this.day = this.start.format("LL");
    this.artist = {
        id: set.expand.artist.id,
        name: set.expand.artist.name,
    };
}

export function Link(link) {
    this.id = link.id;
    this.embed = link.embed;
    this.platform = link.platform;
    this.username = link.username;
    this.url = link.url;
}
