import styles from "@/style/Statistics.module.css";
import {
    BeerStein,
    CalendarCheck,
    Guitar,
    UsersFour,
} from "@phosphor-icons/react/dist/ssr";
import { statistics } from "@/lib/fetch";
import Statistic from "@/components/Statistic";

export const revalidate = 3600;

export default async function Statistics() {
    const data = await statistics();

    return (
        <section className={styles.container}>
            <Statistic
                icon={<UsersFour color="rgb(170, 218, 247)" />}
                text="Spectateurs"
                number={data.attendees}
                color="blue"
            />
            <Statistic
                icon={<CalendarCheck color="rgb(253, 215, 174)" />}
                text="Évènements"
                number={data.events}
                color="orange"
            />
            <Statistic
                icon={<Guitar color="rgb(198, 224, 184)" />}
                text="Artistes"
                number={data.artists}
                color="green"
            />
            <Statistic
                icon={<BeerStein color="rgb(247, 203, 224)" />}
                text="Partenaires"
                number={data.sponsors}
                color="pink"
            />
        </section>
    );
}
