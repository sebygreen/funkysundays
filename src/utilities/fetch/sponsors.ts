import PocketBase from "pocketbase";

export async function getSponsors() {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    const options = {
        fields: "id, collectionId, type, entity, name, logo, url, description",
        sort: "+type",
        filter: "showcase=true",
    };
    try {
        return await pb.collection("sponsors").getFullList(options);
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch staff.");
    }
}
