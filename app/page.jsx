import styles from "./page.module.css";
import Statistics from "@/components/Statistics";
import Hero from "@/components/Hero";
import Promotional from "@/components/Promotional";
import { event } from "@/lib/fetch";
import About from "@/components/About";
import Crowdfunding from "@/components/Crowdfunding";

export const revalidate = 300; //5 minutes

export default async function Page() {
    const data = await event.upcoming();

    const events = {
        round: [],
        promotional: [],
    };

    data.map((i) => {
        if (i.category === "Un Funky Sunday") {
            events.round.push(i);
        } else if (i.category === "Soirée de Promotion") {
            events.promotional.push(i);
        }
    });

    return (
        <main>
            <Hero data={events.round} />
            <Crowdfunding />
            <Promotional data={events.promotional} />
            <div className={styles.responsive}>
                <About />
                <Statistics />
            </div>
        </main>
    );
}
