import PocketBase from "pocketbase";
import { AlertBase, ArtistBase, EventBase, EventExpanded, EventUpcoming, StatisticsBase } from "@/types";
import {
    createAlert,
    createArtistBase,
    createArtistExpanded,
    createEventBase,
    createEventExpanded,
    createEventUpcoming,
    createStaff,
} from "@/utilities/create";
import { cache } from "react";
import { djs } from "@/utilities/tools";

export const fetchUpcomingRound = cache(async (): Promise<EventUpcoming | null> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const filter = `published=true && end>"${djs().utc(true).format("YYYY-MM-DD HH:mm:ss.SSS")}Z" && category="Funky Sunday"`;
        const options = {
            fields: "id, collectionId, name, start, end, category, artwork",
        };
        const res = await pb.collection("events").getFirstListItem(filter, options);
        return createEventUpcoming(res);
    } catch (e: any) {
        if (e.status === 404) {
            return null;
        } else {
            console.error(e);
            throw new Error("Failed to fetch upcoming Funky Sunday.");
        }
    }
});

export const fetchUpcomingPromo = cache(async (): Promise<EventBase[]> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const options = {
            filter: `published=true && end>"${djs().utc(true).format("YYYY-MM-DD HH:mm:ss.SSS")}Z" && category="Promotion"`,
            fields: "id, name, start, end, category, activity",
            sort: "+start",
        };
        const res = await pb.collection("events").getFullList(options);
        return res.map((i) => createEventBase(i, false));
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch upcoming promotional events.");
    }
});

export const fetchAlert = cache(async (): Promise<AlertBase | null> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const filter = "published=true";
        const options = {
            fields: "id, title, type, description, link",
        };
        const res = await pb.collection("alerts").getFirstListItem(filter, options);
        return createAlert(res);
    } catch (e: any) {
        if (e.status === 404) {
            return null;
        } else {
            console.error(e);
            throw new Error("Failed to fetch alert.");
        }
    }
});

export const fetchStatistics = cache(async (): Promise<StatisticsBase> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);

    function countAttendees(data: any) {
        let total = 0;
        data.forEach((i: { attendees: number }) => {
            total = total + i.attendees;
        });
        return total;
    }

    try {
        const events = await pb.collection("events").getFullList({
            fields: "attendees",
            filter: "published=true",
        });
        const artists = await pb.collection("artists").getList(1, 1, {
            fields: "id",
            filter: "published=true",
        });
        const sponsors = await pb.collection("sponsors").getList(1, 1, {
            fields: "id",
        });
        const staff = await pb.collection("staff").getList(1, 1, {
            fields: "id",
        });
        return {
            attendees: countAttendees(events),
            events: events.length,
            artists: artists.totalItems,
            sponsors: sponsors.totalItems,
            staff: staff.totalItems,
        };
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch statistics.");
    }
});

export const fetchEvents = cache(async (): Promise<EventBase[]> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const options = {
            filter: "published=true",
            fields: "id, name, start, end, category, activity",
            sort: "+start",
        };
        const res = await pb.collection("events").getFullList(options);
        return res.map((i) => createEventBase(i, false));
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch events.");
    }
});

export const fetchEventIds = cache(async (): Promise<{ id: string }[]> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        return await pb.collection("events").getFullList({
            fields: "id",
            filter: "published=true",
        });
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch event keys.");
    }
});

export const fetchEventName = cache(async (id: string): Promise<{ name: string }> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        return await pb.collection("events").getOne(id, {
            fields: "name",
            filter: "published=true",
        });
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch artist name.");
    }
});

export const fetchEvent = cache(async (id: string): Promise<EventExpanded> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        let options = {
            expand: "sponsors, schedule_via_event.artist",
            filter: "published=true",
        };
        const res = await pb.collection("events").getOne(id, options);
        return createEventExpanded(res);
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch event.");
    }
});

export const fetchArtists = cache(async (): Promise<ArtistBase[]> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const options = {
            fields: "id, collectionId, name, type, picture",
            filter: "published=true",
            sort: "+name",
        };
        const res = await pb.collection("artists").getFullList(options);
        return res.map((i) => createArtistBase(i));
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch artists.");
    }
});

export const fetchArtistIds = cache(async (): Promise<{ id: string }[]> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        return await pb.collection("artists").getFullList({
            fields: "id",
            filter: "published=true",
        });
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch artist keys.");
    }
});

export const fetchArtistName = cache(async (id: string): Promise<{ name: string }> => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        return await pb.collection("artists").getOne(id, {
            fields: "name",
            filter: "published=true",
        });
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch artist name.");
    }
});

export const fetchArtist = cache(async (id: string) => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const artist: any = await pb.collection("artists").getOne(id, {
            expand: "links",
            filter: "published=true",
            sort: "+start",
        });
        const upcoming: any = await pb.collection("schedule").getFullList({
            filter: `artist="${artist.id}" && end>"${djs().utc(true).format("YYYY-MM-DD HH:mm:ss.SSS")}Z"`,
            expand: "event",
        });
        const embeds = await Promise.all(
            artist.expand.links
                .filter((i: any) => i.embed)
                .map(async (i: any) => {
                    const embed = await fetchEmbed(i.platform, i.url);
                    return { ...i, html: embed.html };
                }),
        );
        return createArtistExpanded({ ...artist, upcoming: upcoming, embeds: embeds });
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch artist.");
    }
});

export const fetchStaff = cache(async () => {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    const options = {
        fields: "id, collectionId, name, role, status, position, picture",
        sort: "+role",
        filter: "published=true",
    };
    try {
        const data = await pb.collection("staff").getFullList(options);
        return data.map((i) => createStaff(i));
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch staff.");
    }
});

export const fetchPlace = async (query: string) => {
    const options = new URLSearchParams({
        access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
        country: "ch",
        language: "fr",
        limit: "1",
    }).toString();
    try {
        const data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${options}`);
        const json = await data.json();
        return json.features[0];
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch place from Mapbox.");
    }
};

export const fetchCaptcha = async (token: string) => {
    const res = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        { method: "POST", cache: "no-store" },
    );
    const json = await res.json();
    return json.score >= 0.5;
};

export const fetchEmbed = async (platform: "soundcloud" | "spotify", url: string) => {
    if (platform === "spotify") {
        const res = await fetch(`https://open.spotify.com/oembed?url=${url}`);
        return await res.json();
    }
    if (platform === "soundcloud") {
        const res = await fetch(`https://soundcloud.com/oembed?url=${url}`);
        return await res.json();
    }
};
