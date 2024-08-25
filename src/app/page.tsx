import Hero from "@/components/Hero";
import { fetchAlert, fetchStatistics, fetchUpcomingPromo, fetchUpcomingRound } from "@/utilities/fetch";
import Alert from "@/components/Alert";
import Promotion from "@/components/Promotion";
import styles from "./page.module.css";
import About from "@/components/About";
import Statistics from "@/components/client/Statistics";

export const revalidate = 30;

export default async function Page() {
    const data = {
        upcoming: {
            round: await fetchUpcomingRound(),
            promo: await fetchUpcomingPromo(),
        },
        alert: await fetchAlert(),
        statistics: await fetchStatistics(),
    };

    return (
        <main>
            <Hero data={data.upcoming.round} />
            {data.alert && <Alert data={data.alert} />}
            <Promotion data={data.upcoming.promo} />
            <div className={styles.responsive}>
                <About data={data.statistics.staff} />
                <Statistics data={data.statistics} />
            </div>
        </main>
    );
}
