import Events from "@/components/events/Events";
import { Metadata } from "next";
import { fetchEvents } from "@/utilities/fetch/events";

export const metadata: Metadata = {
    title: "Évènements",
};

export default async function Page() {
    const data = await fetchEvents();

    return <Events data={data} />;
}
