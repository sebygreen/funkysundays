import About from "@/components/About";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import {
    fetchCountArtists,
    fetchCountAttendees,
    fetchCountEvents,
    fetchCountSponsors,
    fetchEventUpcoming,
} from "@/lib/fetch";
import styles from "./page.module.css";

export default async function Home() {
    const upcoming = await fetchEventUpcoming();
    const statistics = {
        attendees: await fetchCountAttendees(),
        events: await fetchCountEvents(),
        artists: await fetchCountArtists(),
        sponsors: await fetchCountSponsors(),
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
