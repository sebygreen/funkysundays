import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
require("dayjs/locale/fr");
dayjs.locale("fr");
dayjs.extend(localizedFormat);

export function Link(data) {
    this.id = data.id;
    this.url = data.url;
    this.embed = data.embed;
    this.platform = data.platform;
    this.username = data.username;
}

export function Collaboration(data, options) {
    this.id = data.id;
    this.name = data.name;
    let regex = /.+_([0-9]+)x([0-9]+)_.+/g;
    let match = [...data.logo.matchAll(regex)][0];
    this.logo = {
        src: `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${data.id}/${data.logo}`,
        size: [Number(match[1]), Number(match[2])], //height, width
    };
    data.url && (this.url = data.url);
    options && options.category && (this.category = data.category);
}

export function Set(data) {
    this.id = data.id;
    this.start = data.start;
    this.end = data.end;
    this.day = dayjs(this.start).format("LL");
    this.artist = {
        id: data.expand.artist.id,
        name: data.expand.artist.name,
    };
}

export function Event(data, options) {
    this.id = options.artist ? data.expand.event.id : data.id;
    this.name = options.artist ? data.expand.event.name : data.name;
    this.start = data.start;
    this.category = options.artist ? data.expand.event.category : data.category;
    if (options && options.expanded) {
        this.end = data.end;
        this.multi = dayjs(this.end).isAfter(dayjs(this.start), "day");
        this.location = data.location;
        this.attendees = data.attendees;
        data.poster &&
            (this.poster = `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${this.id}/${data.poster}`);
        data.expand && data.expand.sponsors && (this.sponsors = data.expand.sponsors.map((i) => new Collaboration(i)));
        data.expand &&
            data.expand.partners &&
            (this.partners = data.expand.partners.map((i) => new Collaboration(i, { category: true })));
        data.expand &&
            data.expand["schedule(event)"] &&
            (this.schedule = data.expand["schedule(event)"].map((i) => new Set(i)));
    }
}

export function Artist(data, options) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    data.picture &&
        (this.picture = `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${this.id}/${data.picture}`);
    if (options && options.expanded) {
        this.description = data.description;
        this.links = data.expand.links.map((i) => new Link(i));
        let upcoming = data.expand["schedule(artist)"].find(
            (i) => dayjs(i.start).isAfter(dayjs()) && !i.expand.event.hidden,
        );
        upcoming && (this.upcoming = new Event(upcoming, { expanded: false, artist: true }));
    }
}

export function Staff(data) {
    this.id = data.id;
    this.name = data.name;
    data.role && (this.role = data.role);
    this.status = data.status;
    data.position && (this.position = data.position.split(", "));
    data.picture &&
        (this.picture = `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${this.id}/${data.picture}`);
}
