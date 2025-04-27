import Hero from "@/components/home/Hero";
import Alert from "@/components/home/Alert";
import Promotion from "@/components/home/Promotion";
import About from "@/components/home/About";
import Statistics from "@/components/home/Statistics";
import Slideshow from "@/components/home/Slideshow";
import { fetchAlert, fetchStatistics, fetchUpcomingPromotional, fetchUpcomingRound } from "@/utilities/fetch/home";

export default async function Page() {
    const data = {
        upcoming: {
            round: await fetchUpcomingRound(),
            promotional: await fetchUpcomingPromotional(),
        },
        alert: await fetchAlert(),
        statistics: await fetchStatistics(),
    };

    return (
        <>
            <Hero data={data.upcoming.round} />
            {data.alert && <Alert data={data.alert} />}
            <About data={data.statistics.staff} />
            <Statistics data={data.statistics} />
            <Slideshow />
            <Promotion data={data.upcoming.promotional} />
        </>
    );
}
