import About from "@/components/About";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import {fetchCountArtists, fetchCountAttendees, fetchCountEvents, fetchEventUpcoming} from "@/lib/fetch";
import styles from "./page.module.css";

export default async function Home() {
    const upcoming = await fetchEventUpcoming();
    const statistics = {
        attendees: [],
        events: [],
        artists: [],
    };
    statistics.attendees = await fetchCountAttendees()
    statistics.events = await fetchCountEvents()
    statistics.artists = await fetchCountArtists()
    return (
        <div className={`wrapper spaced ${styles.wrapper}`}>
            <Hero event={upcoming}/>
            <div className="responsive">
                <About/>
                <Statistics statistics={statistics}/>
            </div>
        </div>
    );
}
