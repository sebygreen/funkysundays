import "server-only";
import PocketBase from "pocketbase";
import { createStaff } from "@/utilities/create";
import { StaffBase } from "@/types";

export async function fetchStaff(): Promise<StaffBase[]> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const data = await pb.collection("staff").getFullList({
            fields: "id, collectionId, name, position, picture",
            filter: "published=true",
        });
        return data.map((i) => createStaff(i));
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch staff.");
    }
}
