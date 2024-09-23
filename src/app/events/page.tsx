import { fetchEvents } from "@/utilities/fetch";
import Events from "@/components/client/Events";
import { Metadata } from "next";

export const revalidate = 30;

export const metadata: Metadata = {
    title: "Évènements",
};

export default async function Page() {
    const data = await fetchEvents();

    return (
        <main>
            <Events data={data} />
        </main>
    );
}
