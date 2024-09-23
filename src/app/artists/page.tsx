import { fetchArtists } from "@/utilities/fetch";
import Artists from "@/components/client/Artists";
import { Metadata } from "next";

export const revalidate = 30;

export const metadata: Metadata = {
    title: "Artistes",
};

export default async function Page() {
    const data = await fetchArtists();

    return (
        <main>
            <Artists data={data} />
        </main>
    );
}
