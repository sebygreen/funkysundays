import { fetchArtists } from "@/utilities/fetch";
import Artists from "@/components/client/Artists";

export const revalidate = 30;

export const metadata = {
    title: "Évènements",
};

export default async function Page() {
    const data = await fetchArtists();

    return (
        <main>
            <Artists data={data} />
        </main>
    );
}
