import "server-only";
import { AlertBase, EventBase, EventUpcoming, StatisticsBase } from "@/types";
import PocketBase, { ClientResponseError } from "pocketbase";
import { djs } from "@/utilities/tools";
import { createAlert, createEventBase, createEventUpcoming } from "@/utilities/create";

export async function fetchUpcomingRound(): Promise<EventUpcoming | null> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    const now = djs().utc(true).format("YYYY-MM-DD HH:mm:ss.SSS");
    const filter = `published=true && category="Funky Sunday" && end>"${now}Z"`;
    const options = {
        fields: "id, collectionId, name, start, end, category, artwork",
        sort: "+start",
    };
    try {
        const res = await pb.collection("events").getFirstListItem(filter, options);
        return createEventUpcoming(res);
    } catch (e) {
        if (e instanceof ClientResponseError && e.status === 404) {
            return null;
        } else {
            console.error(e);
            throw new Error("Failed to fetch upcoming Funky Sunday.");
        }
    }
}

export async function fetchUpcomingPromotional(): Promise<EventBase[]> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    const now = djs().utc(true).format("YYYY-MM-DD HH:mm:ss.SSS");
    const options = {
        filter: `published=true && category="Promotion" && end>"${now}Z"`,
        fields: "id, name, start, end, category, activity",
        sort: "+start",
    };
    try {
        const res = await pb.collection("events").getFullList(options);
        return res.map((i) => createEventBase(i, false));
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch upcoming promotional events.");
    }
}

export async function fetchAlert(): Promise<AlertBase | null> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    const filter = "published=true";
    const options = {
        fields: "id, title, type, description, link",
    };
    try {
        const res = await pb.collection("alerts").getFirstListItem(filter, options);
        return createAlert(res);
    } catch (e) {
        if (e instanceof ClientResponseError && e.status === 404) {
            return null;
        } else {
            console.error(e);
            throw new Error("Failed to fetch alert.");
        }
    }
}

export async function fetchStatistics(): Promise<StatisticsBase> {
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
}
