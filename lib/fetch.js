import { Artist, Event, Staff } from "./create";
import dayjs from "dayjs";
import PocketBase from "pocketbase";
import { cache } from "react";

const pb = new PocketBase(process.env.POCKETBASE_URL);
pb.autoCancellation(false);

function error(e) {
    if (e.status === 404) {
        console.warn("Not Found:", e.response);
    } else if (e.isAbort) {
        console.warn("Auto-Cancelled");
    } else {
        console.error("Critical Error:", e);
    }
}

export const mapbox = {
    geocoding: async (query) => {
        let endpoint = "mapbox.places";
        let options = {
            country: "ch",
            language: "fr",
            limit: 1,
        };
        options = new URLSearchParams(options).toString();
        try {
            let data = await fetch(
                `https://api.mapbox.com/geocoding/v5/${endpoint}/${query}.json?${options}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
            );
            return await data.json();
        } catch (e) {
            error(e);
        }
    },
};

export async function statistics() {
    let attendees, events, artists, sponsors;

    function countAttendees(data) {
        let total = 0;
        data.forEach((i) => {
            total = total + i.attendees;
        });
        return total;
    }

    try {
        const collection = "events";
        const options = {
            fields: "attendees",
            filter: "hidden != true",
        };
        const data = await pb.collection(collection).getFullList(options);
        attendees = countAttendees(data);
        events = data.length;
    } catch (e) {
        error(e);
    }
    try {
        const collection = "artists";
        const options = {
            fields: "id",
        };
        const data = await pb.collection(collection).getList(1, 1, options);
        artists = data.totalItems;
    } catch (e) {
        error(e);
    }
    try {
        const collection = "sponsors";
        const options = {
            fields: "id",
        };
        const data = await pb.collection(collection).getList(1, 1, options);
        sponsors = data.totalItems;
    } catch (e) {
        error(e);
    }
    return {
        attendees: attendees,
        events: events,
        artists: artists,
        sponsors: sponsors,
    };
}

export const event = {
    all: cache(async () => {
        let collection = "events";
        let options = {
            fields: "id, name, start, end, category",
            sort: "+start",
            filter: "hidden!=true",
        };
        try {
            let data = await pb.collection(collection).getFullList(options);
            return data.map((i) => new Event(i));
        } catch (e) {
            error(e);
        }
    }),
    one: cache(async (id) => {
        let collection = "events";
        let fields = {
            main: ["id", "collectionId", "name", "start", "end", "location", "category", "attendees", "poster"],
            partners: {
                prefix: "expand.partners",
                fields: ["id", "collectionId", "name", "logo", "url"],
            },
            sponsors: {
                prefix: "expand.sponsors",
                fields: ["id", "collectionId", "name", "logo", "category", "url"],
            },
            schedule: {
                prefix: "expand.schedule(event)",
                fields: ["id", "start", "end", "expand.artist.id", "expand.artist.name"],
            },
            return: () =>
                fields.main.join(", ") +
                `, ${fields.partners.prefix}.` +
                fields.partners.fields.join(`, ${fields.partners.prefix}.`) +
                `, ${fields.sponsors.prefix}.` +
                fields.sponsors.fields.join(`, ${fields.sponsors.prefix}.`) +
                `, ${fields.schedule.prefix}.` +
                fields.schedule.fields.join(`, ${fields.schedule.prefix}.`),
        };
        let options = {
            fields: fields.return(),
            expand: "partners, sponsors, schedule(event).artist",
            filter: "hidden!=true",
        };
        try {
            let data = await pb.collection(collection).getOne(id, options);
            return new Event(data, { expanded: true });
        } catch (e) {
            error(e);
        }
    }),
    upcoming: cache(async () => {
        console.log(dayjs().format());
        const collection = "events";
        const options = {
            fields: "id, name, start, category",
            sort: "+start",
            //filter: `start>"${dayjs().format()}"`,
            filter: `hidden!=true && start>"${dayjs().format()}"`,
        };
        try {
            let data = await pb.collection(collection).getFullList(options);
            return data.map((i) => new Event(i));
        } catch (e) {
            error(e);
        }
    }),
};

export const artist = {
    all: cache(async () => {
        let collection = "artists";
        let options = {
            fields: "id, collectionId, name, picture, type",
            sort: "+name",
            filter: "hidden!=true",
        };
        try {
            let data = await pb.collection(collection).getFullList(options);
            return data.map((i) => new Artist(i, { expanded: false }));
        } catch (e) {
            error(e);
        }
    }),
    one: cache(async (id) => {
        let collection = "artists";
        let fields = {
            main: ["id", "collectionId", "picture", "name", "type", "description"],
            links: {
                prefix: "expand.links",
                fields: ["id", "embed", "platform", "username", "url"],
            },
            schedule: {
                prefix: "expand.schedule(artist)",
                fields: ["start", "end"],
            },
            event: {
                prefix: "expand.schedule(artist).expand.event",
                fields: ["id", "hidden", "name", "category"],
            },
            return: () =>
                fields.main.join(", ") +
                `, ${fields.links.prefix}.` +
                fields.links.fields.join(`, ${fields.links.prefix}.`) +
                `, ${fields.schedule.prefix}.` +
                fields.schedule.fields.join(`, ${fields.schedule.prefix}.`) +
                `, ${fields.event.prefix}.` +
                fields.event.fields.join(`, ${fields.event.prefix}.`),
        };
        let options = {
            fields: fields.return(),
            expand: "links, schedule(artist).event",
            filter: "hidden!=true",
        };
        try {
            const data = await pb.collection(collection).getOne(id, options);
            return new Artist(data, { expanded: true });
        } catch (e) {
            error(e);
        }
    }),
};

export const staff = {
    all: cache(async () => {
        const collection = "staff";
        const options = {
            requestKey: "staff.all",
            fields: "id, collectionId, name, role, status, position, picture",
            sort: "+role",
        };
        try {
            const data = await pb.collection(collection).getFullList(options);
            return data.map((i) => new Staff(i));
        } catch (e) {
            error(e);
        }
    }),
};
