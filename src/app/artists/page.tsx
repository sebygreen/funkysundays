import Artists from "@/components/artists/Artists";
import { Metadata } from "next";
import { fetchArtists } from "@/utilities/fetch/artists";

export const metadata: Metadata = {
    title: "Artistes",
};

export default async function Page() {
    const data = await fetchArtists();

    return <Artists data={data} />;
}
