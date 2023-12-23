import { Artist, Event } from "./objects";
import dayjs from "dayjs";
import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

//events
export async function fetchEvent(id) {
    try {
        const data = await pb.collection("events").getOne(id, {
            requestKey: "event",
            expand: "sponsors, schedule(event).artist",
            fields: "id, collectionId, name, start, end, category, attendees, poster, location, expand.sponsors.id, expand.sponsors.collectionId, expand.sponsors.name, expand.sponsors.logo, expand.sponsors.url, expand.schedule(event).id, expand.schedule(event).start, expand.schedule(event).end, expand.schedule(event).expand.artist.id, expand.schedule(event).expand.artist.name",
        });
        return new Event(data, { expanded: true, artist: false });
    } catch (err) {
        console.error("Error fetching Event", err);
        return false;
    }
}

export async function fetchEvents() {
    try {
        const data = await pb.collection("events").getFullList({
            requestKey: "events",
            fields: "id, name, start, end, category",
            sort: "-start",
        });
        const objects = data.map((event) => {
            return new Event(event);
        });
        const events = {
            upcoming: [],
            archived: [],
        };
        objects.map((event) => {
            if (event.start.isAfter(dayjs())) {
                events.upcoming.push(event);
            } else {
                events.archived.push(event);
            }
        });
        return events;
    } catch (err) {
        console.error("Error fetching Events", err);
        return false;
    }
}

export async function fetchEventSlugs() {
    try {
        return await pb.collection("events").getFullList({
            requestKey: "event-slugs",
            fields: "id",
        });
    } catch (err) {
        console.error("Error fetching Event Slugs", err);
        return false;
    }
}

export async function fetchEventUpcoming() {
    try {
        const data = await pb.collection("events").getFirstListItem(`start > "${dayjs().format()}"`, {
            requestKey: null,
            fields: "id, name, start, category",
        });
        return new Event(data);
    } catch (err) {
        console.error("Error fetching Upcoming Event", err);
        return false;
    }
}

//artists
export async function fetchArtist(id) {
    try {
        const data = await pb.collection("artists").getOne(id, {
            requestKey: "artist",
            fields: "id, collectionId, thumbnail, name, description, expand.links.id, expand.links.embed, expand.links.platform, expand.links.username, expand.links.url, expand.schedule(artist).start, expand.schedule(artist).end, expand.schedule(artist).expand.event.id, expand.schedule(artist).expand.event.name, expand.schedule(artist).expand.event.category",
            expand: "links, schedule(artist).event",
        });
        return new Artist(data, { expanded: true });
    } catch (err) {
        console.error("Error fetching Artist:", err);
        return false;
    }
}

export async function fetchArtists() {
    try {
        const data = await pb.collection("artists").getFullList({
            requestKey: "artists",
            field: "id, collectionId, name, thumbnail, type",
        });
        return data.map((artist) => {
            return new Artist(artist);
        });
    } catch (err) {
        console.error("Error fetching Artists", err);
        return false;
    }
}

export async function fetchArtistSlugs() {
    try {
        return await pb.collection("artists").getFullList({
            requestKey: "artist-slugs",
            fields: "id",
        });
    } catch (err) {
        console.error("Error fetching Artist Slugs", err);
        return false;
    }
}

//statistics
export async function fetchCountArtists() {
    try {
        const records = await pb.collection("artists").getList(1, 1, {
            requestKey: "count-artists",
        });
        return records.totalItems;
    } catch (err) {
        console.log("Error fetching Artist Count", err);
        return false;
    }
}

export async function fetchCountAttendees() {
    try {
        const records = await pb.collection("events").getFullList({
            requestKey: "count-attendees",
            fields: "attendees",
        });
        return Object.values(records).reduce((accumulator, { attendees }) => accumulator + attendees, 0);
    } catch (err) {
        console.log("Error fetching Attendee Count", err);
        return false;
    }
}

export async function fetchCountEvents() {
    try {
        const records = await pb.collection("events").getList(1, 1, {
            requestKey: "count-events",
        });
        return records.totalItems;
    } catch (err) {
        console.error("Error fetching Event Count", err);
        return false;
    }
}

//sponsors
export async function fetchCountSponsors() {
    try {
        const records = await pb.collection("sponsors").getList(1, 1, {
            requestKey: "count-sponsors",
        });
        return records.totalItems;
    } catch (err) {
        console.error("Error fetching sponsors.", "\n", err);
        return false;
    }
}

//gps
export async function fetchCoordinates(query) {
    try {
        const data = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ch&limit=3&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`,
        );
        const json = await data.json();
        return {
            longitude: json.features[0].center[0],
            latitude: json.features[0].center[1],
        };
    } catch (err) {
        console.error("Error fetching Coordinates", err);
        return false;
    }
}

//staff
export async function fetchStaff() {
    try {
        return await pb.collection("staff").getFullList({
            requestKey: "staff",
            fields: "id, collectionId, name, position, picture",
        });
    } catch (err) {
        console.log("Error fetching Staff", err);
        return false;
    }
}
