import { Artist, Event } from "./objects";
import dayjs from "dayjs";
import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

//artists
export async function fetchArtist(id) {
    try {
        const data = await pb.collection("artists").getOne(id, {
            requestKey: "artist",
            fields: "id, collectionId, thumbnail, name, description, expand.links.id, expand.links.embed, expand.links.platform, expand.links.username, expand.links.url, expand.schedule(artist).start, expand.schedule(artist).end, expand.schedule(artist).expand.event.id, expand.schedule(artist).expand.event.name, expand.schedule(artist).expand.event.category",
            expand: "links, schedule(artist).event",
        });
        //success
        return new Artist(data, { expanded: true });
    } catch (err) {
        //failure
        console.error(err);
        return false;
    }
}

export async function fetchArtists() {
    try {
        const data = await pb.collection("artists").getFullList({
            requestKey: "artists",
            field: "id, collectionId, name, thumbnail, type",
        });
        //success
        return data.map((artist) => {
            return new Artist(artist);
        });
    } catch (err) {
        //failure
        console.error(err);
        return false;
    }
}

export async function fetchArtistSlugs() {
    try {
        const data = await pb.collection("artists").getFullList({
            requestKey: "artist-ids",
            fields: "id",
        });
        //success
        return data;
    } catch (err) {
        //failure
        console.error(err);
        return false;
    }
}

//statistics
export async function fetchCountArtists() {
    try {
        const records = await pb.collection("artists").getList(1, 1, {
            requestKey: "statistics-artists",
        });
        //success
        return records.totalItems;
    } catch (err) {
        //failure
        console.log(err);
        return false;
    }
}

export async function fetchCountAttendees() {
    try {
        const records = await pb.collection("events").getFullList({
            requestKey: "statistics-attendees",
            fields: "attendees",
        });
        //success
        return Object.values(records).reduce((accumulator, { attendees }) => accumulator + attendees, 0);
    } catch (err) {
        //failure
        console.log(err);
        return false;
    }
}

export async function fetchCountEvents() {
    try {
        const records = await pb.collection("events").getList(1, 1, {
            requestKey: "statistics-events",
        });
        //success
        return records.totalItems;
    } catch (err) {
        //failure
        console.error(err);
        return false;
    }
}

//gps
export async function fetchCoordinates(query) {
    try {
        const data = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=ch&limit=3&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
        );
        const json = await data.json();
        //success
        const coordinates = {
            longitude: json.features[0].center[0],
            latitude: json.features[0].center[1],
        };
        return coordinates;
    } catch (err) {
        //failure
        console.error(err);
        return false;
    }
}

//events
export async function fetchEvent(id) {
    try {
        const data = await pb.collection("events").getOne(id, {
            requestKey: "event",
            expand: "sponsors, schedule(event).artist",
            fields: "id, collectionId, name, start, end, category, attendees, poster, location, expand.sponsors.id, expand.sponsors.collectionId, expand.sponsors.name, expand.sponsors.logo, expand.sponsors.url, expand.schedule(event).id, expand.schedule(event).start, expand.schedule(event).end, expand.schedule(event).expand.artist.id, expand.schedule(event).expand.artist.name",
        });
        //success
        return new Event(data, { expanded: true });
    } catch (err) {
        //failure
        console.error(err);
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
        //success
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
        //failure
        console.error(err);
        return false;
    }
}

export async function fetchEventSlugs() {
    try {
        const data = await pb.collection("events").getFullList({
            requestKey: "event-ids",
            fields: "id",
        });
        //success
        return data;
    } catch (err) {
        //failure
        console.error(err);
        return false;
    }
}

export async function fetchEventUpcoming() {
    try {
        const data = await pb.collection("events").getFirstListItem(`start > "${dayjs().format()}"`, {
            requestKey: "upcoming-event",
            fields: "id, name, start, category",
        });
        // success
        return new Event(data);
    } catch (err) {
        // failure
        console.error(err);
        return false;
    }
}
