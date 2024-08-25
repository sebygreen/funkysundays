import { fetchEvents } from "@/utilities/fetch";
import Events from "@/components/client/Events";

export const revalidate = 30;

export const metadata = {
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
