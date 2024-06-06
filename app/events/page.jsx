import Events from "@/components/client/Events";
import { event } from "@/lib/fetch";

export const revalidate = 300; //5 minutes

export const metadata = {
    title: "Évènements",
};

export default async function Page() {
    const data = await event.all();
    const object = data.reduce((a, v) => ({ ...a, [data.indexOf(v)]: { ...v } }), {});

    return (
        <main>
            <Events data={object} />
        </main>
    );
}
