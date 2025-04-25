import "server-only";
import { ArtistBase, ArtistExpanded } from "@/types";
import PocketBase from "pocketbase";
import { createArtistBase, createArtistExpanded } from "@/utilities/create";
import { djs } from "@/utilities/tools";
import { fetchEmbed } from "@/utilities/fetch/providers";

export async function fetchArtists(): Promise<ArtistBase[]> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const res = await pb.collection("artists").getFullList({
            fields: "id, collectionId, name, sort, type, picture",
            filter: "published=true",
            sort: "+name",
        });
        return res.map((i) => createArtistBase(i));
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch artists.");
    }
}

export async function fetchArtist(id: string): Promise<ArtistExpanded> {
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
        const artist: any = await pb.collection("artists").getOne(id, {
            expand: "links",
            filter: "published=true",
        });
        const upcoming: any = await pb.collection("schedule").getFullList({
            filter: `artist="${artist.id}" && end>"${djs().utc(true).format("YYYY-MM-DD HH:mm:ss.SSS")}Z"`,
            expand: "event",
            sort: "+start",
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
}
