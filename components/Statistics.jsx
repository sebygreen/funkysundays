import styles from "@/style/Statistics.module.css";
import Statistic from "@/components/Statistic";
import {BeerStein, CalendarCheck, Guitar, UsersFour} from "@phosphor-icons/react/dist/ssr";
import {statistic} from "@/lib/fetch";

export const revalidate = 3600;

export default async function Statistics() {
    const attendees = await statistic.attendees();
    const events = await statistic.events();
    const artists = await statistic.artists();
    const sponsors = await statistic.sponsors();
    return (
        <section className={styles.container}>
            <Statistic
                icon={<UsersFour size={32} color="rgb(170, 218, 247)"/>}
                text="Spectateurs"
                number={attendees}
                color="blue"
            />
            <Statistic
                icon={<CalendarCheck size={32} color="rgb(253, 215, 174)"/>}
                text="Évènements"
                number={events}
                color="orange"
            />
            <Statistic
                icon={<Guitar size={32} color="rgb(198, 224, 184)"/>}
                text="Artistes"
                number={artists}
                color="green"
            />
            <Statistic
                icon={<BeerStein size={32} color="rgb(247, 203, 224)"/>}
                text="Partenaires"
                number={sponsors}
                color="pink"
            />
        </section>
    )
}