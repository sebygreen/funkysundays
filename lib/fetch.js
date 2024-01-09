import { Event, Artist, Staff } from "./create";
import dayjs from "dayjs";
import PocketBase from "pocketbase";
const pb = new PocketBase(process.env.POCKETBASE_URL);

const get = {
    pocketbase: {
        all: async (collection, options) => {
            try {
                return await pb.collection(collection).getFullList(options);
            } catch (e) {
                return { error: e.response };
            }
        },
        one: async (collection, id, options) => {
            try {
                return await pb.collection(collection).getOne(id, options);
            } catch (e) {
                return { error: e.response };
            }
        },
        first: async (collection, filter, options) => {
            try {
                return await pb.collection(collection).getFirstListItem(filter, options);
            } catch (e) {
                return { error: e.response };
            }
        },
        count: async (collection, options) => {
            try {
                return await pb.collection(collection).getList(1, 10, options);
            } catch (e) {
                console.error(e);
                return e.response;
            }
        },
    },
    mapbox: {
        geocoding: async (endpoint, query, options) => {
            try {
                let data = await fetch(
                    `https://api.mapbox.com/geocoding/v5/${endpoint}/${query}.json?${options}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
                );
                return await data.json();
            } catch (e) {
                return e.response;
            }
        },
    },
};

//outside usage
export const mapbox = {
    geocoding: async (query) => {
        let endpoint = "mapbox.places";
        let options = {
            country: "ch",
            language: "fr",
            limit: 1,
        };
        options = new URLSearchParams(options).toString();
        return await get.mapbox.geocoding(endpoint, query, options);
    },
};

export const statistic = {
    attendees: async () => {
        const collection = "events";
        const options = {
            requestKey: "statistic.attendees",
            fields: "attendees",
            filter: "hidden!=true",
        };
        const raw = await get.pocketbase.all(collection, options);
        let total = 0;
        raw.forEach((i) => {
            total = total + i.attendees;
        });
        return total;
    },
    events: async () => {
        let collection = "events";
        let options = {
            requestKey: "statistic.events",
            fields: "id",
            filter: "hidden!=true",
        };
        let raw = await get.pocketbase.count(collection, options);
        return raw.totalItems;
    },
    artists: async () => {
        let collection = "artists";
        let options = {
            requestKey: "statistic.artists",
            fields: "id",
        };
        let raw = await get.pocketbase.count(collection, options);
        return raw.totalItems;
    },
    sponsors: async () => {
        let collection = "sponsors";
        let options = {
            requestKey: "statistic.sponsors",
            fields: "id",
        };
        let raw = await get.pocketbase.count(collection, options);
        return raw.totalItems;
    },
};

export const event = {
    all: async () => {
        let collection = "events";
        let options = {
            requestKey: "event.all",
            fields: "id, name, start, end, category",
            sort: "-start",
            filter: "hidden!=true",
        };
        let raw = await get.pocketbase.all(collection, options);
        return raw.map((i) => new Event(i, { expended: false, artist: false }));
    },
    slugs: async () => {
        let collection = "events";
        let options = {
            requestKey: "event.slugs",
            fields: "id",
            filter: "hidden!=true",
        };
        return await get.pocketbase.all(collection, options);
    },
    one: async (id, expanded) => {
        let collection = "events";
        let options = {
            requestKey: "event.one",
            expand: "sponsors, schedule(event).artist",
            fields: "id, collectionId, name, start, end, category, attendees, poster, location, expand.sponsors.id, expand.sponsors.collectionId, expand.sponsors.name, expand.sponsors.logo, expand.sponsors.url, expand.schedule(event).id, expand.schedule(event).start, expand.schedule(event).end, expand.schedule(event).expand.artist.id, expand.schedule(event).expand.artist.name",
            filter: "hidden!=true",
        };
        let raw = await get.pocketbase.one(collection, id, options);
        return new Event(raw, { expanded: expanded, artist: false });
    },
    upcoming: async () => {
        let collection = "events";
        let options = {
            requestKey: null,
            fields: "id, name, start, category",
        };
        let filter = `start > "${dayjs().format()}" && hidden != true`;
        let raw = await get.pocketbase.first(collection, filter, options);
        if (raw.error) {
            return raw;
        } else {
            return new Event(raw, { expanded: false, artist: false });
        }
    },
};

export const artist = {
    all: async () => {
        let collection = "artists";
        let options = {
            requestKey: "artist.all",
            fields: "id, collectionId, name, picture, type",
            sort: "name",
        };
        let raw = await get.pocketbase.all(collection, options);
        return raw.map((i) => new Artist(i, { expanded: false }));
    },
    slugs: async () => {
        let collection = "artists";
        let options = {
            requestKey: "artist.slugs",
            fields: "id",
        };
        return await get.pocketbase.all(collection, options);
    },
    one: async (id, expanded) => {
        let collection = "artists";
        let options = {
            requestKey: "artist.one",
            fields: "id, collectionId, picture, name, description, expand.links.id, expand.links.embed, expand.links.platform, expand.links.username, expand.links.url, expand.schedule(artist).start, expand.schedule(artist).end, expand.schedule(artist).expand.event.id, expand.schedule(artist).expand.event.hidden, expand.schedule(artist).expand.event.name, expand.schedule(artist).expand.event.category",
            expand: "links, schedule(artist).event",
        };
        let raw = await get.pocketbase.one(collection, id, options);
        return new Artist(raw, { expanded: expanded });
    },
};

export const staff = {
    all: async () => {
        let collection = "staff";
        let options = {
            requestKey: "staff.all",
            fields: "id, collectionId, name, role, status, position, picture",
            sort: "+role",
        };
        let raw = await get.pocketbase.all(collection, options);
        return raw.map((i) => new Staff(i));
    },
};
