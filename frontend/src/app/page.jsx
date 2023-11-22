import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import { countArtists, countAttendees, countEvents, eventUpcoming } from "@/lib/fetch";
import styles from "./page.module.css";

export default async function Home() {
    const upcoming = await eventUpcoming();
    const statistics = {
        attendees: await countAttendees(),
        events: await countEvents(),
        artists: await countArtists(),
    };
    return (
        <div className={`wrapper spaced ${styles.wrapper}`}>
            <Hero event={upcoming} />
            <div className="responsive">
                <About />
                <Statistics statistics={statistics} />
            </div>
        </div>
    );
}
