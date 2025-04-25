import "server-only";
import { EventBase, EventExpanded } from "@/types";
import PocketBase from "pocketbase";
import { createEventBase, createEventExpanded } from "@/utilities/create";

export async function fetchEvents(): Promise<EventBase[]> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const res = await pb.collection("events").getFullList({
            filter: "published=true",
            fields: "id, name, start, end, category, activity",
            sort: "+start",
        });
        return res.map((i) => createEventBase(i, false));
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch events.");
    }
}

export async function fetchEvent(id: string): Promise<EventExpanded> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const event = await pb.collection("events").getOne(id, {
            expand: "sponsors",
            filter: "published=true",
        });
        const schedule = await pb.collection("schedule").getFullList({
            expand: "artist",
            filter: `event="${id}"`,
            sort: "+start",
        });
        return createEventExpanded(event, schedule);
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch event.");
    }
}
