import styles from "@/style/Statistics.module.css";
import Statistic from "./Statistic";
import { UsersFour, CalendarCheck, Guitar, BeerStein } from "@phosphor-icons/react/dist/ssr";

export default function Statistics({ statistics }) {
    return (
        <section
            id="statistics"
            className={styles.container}
        >
            <Statistic
                icon={
                    <UsersFour
                        size={32}
                        color="rgb(170, 218, 247)"
                    />
                }
                text="Spectateurs Funky Sundays."
                number={statistics.attendees}
                color="blue"
            />
            <Statistic
                icon={
                    <CalendarCheck
                        size={32}
                        color="rgb(253, 215, 174)"
                    />
                }
                text="Événements organisés."
                number={statistics.events}
                color="orange"
            />
            <Statistic
                icon={
                    <Guitar
                        size={32}
                        color="rgb(198, 224, 184)"
                    />
                }
                text="Musiciens & groupes locaux."
                number={statistics.artists}
                color="green"
            />
            <Statistic
                icon={
                    <BeerStein
                        size={32}
                        color="rgb(247, 203, 224)"
                    />
                }
                text="Commerces & partenaires locaux."
                number={statistics.sponsors}
                color="pink"
            />
        </section>
    );
}
