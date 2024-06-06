import dayjs from "dayjs";

export function Link(data) {
    this.id = data.id;
    this.url = data.url;
    this.embed = data.embed;
    this.platform = data.platform;
    this.username = data.username;
}

export function Collaboration(data) {
    this.id = data.id;
    this.name = data.name;
    let regex = /.+_([0-9]+)x([0-9]+)_.+/g;
    let match = [...data.logo.matchAll(regex)][0];
    this.logo = {
        src: `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${data.id}/${data.logo}`,
        height: Number(match[1]),
        width: Number(match[2]),
    };
    if (data.url) {
        this.url = data.url;
    }
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
    if (options && options.artist) {
        this.id = data.expand.event.id;
        this.name = data.expand.event.name;
        this.category = data.expand.event.category;
    } else {
        this.id = data.id;
        this.name = data.name;
        this.category = data.category;
    }
    this.start = data.start;
    this.archive = dayjs().isAfter(dayjs(this.start));
    if (options && options.expanded) {
        this.end = data.end;
        this.multi = dayjs(this.end).isAfter(dayjs(this.start), "day");
        this.location = data.location ? data.location : "N/A";
        this.attendees = data.attendees > 0 ? data.attendees : "N/A";
        if (data.poster) {
            this.poster = `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${this.id}/${data.poster}`;
        }
        if (data.expand) {
            if (data.expand.partners) {
                this.partners = data.expand.partners.map((i) => new Collaboration(i));
            }
            if (data.expand.sponsors) {
                this.sponsors = data.expand.sponsors.map((i) => new Collaboration(i));
            }
            if (data.expand["schedule(event)"]) {
                this.schedule = data.expand["schedule(event)"].map((i) => new Set(i));
            }
        }
    }
}

export function Artist(data, options) {
    this.id = data.id;
    this.name = data.name;
    this.type = data.type;
    if (data.picture) {
        this.picture = `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${this.id}/${data.picture}`;
    }
    if (options && options.expanded) {
        this.description = data.description;
        let links = {
            embeds: [],
            socials: [],
        };
        data.expand.links.map((i) => {
            if (i.embed) {
                links.embeds.push(new Link(i));
            } else {
                links.socials.push(new Link(i));
            }
        });
        this.links = links;
        let upcoming = data.expand["schedule(artist)"].find(
            (i) => !i.expand.event.hidden && dayjs(i.start).isAfter(dayjs()),
        );
        if (upcoming) {
            this.upcoming = new Event(upcoming, { artist: true });
        }
    }
}

export function Staff(data) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    if (data.role) {
        this.role = data.role;
    }
    if (data.position) {
        this.position = data.position.split(", ");
    }
    if (data.picture) {
        this.picture = `${process.env.POCKETBASE_URL}/api/files/${data.collectionId}/${this.id}/${data.picture}`;
    }
}
