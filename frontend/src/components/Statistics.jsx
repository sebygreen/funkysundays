import styles from "@/style/Statistics.module.css";
import Statistic from "./Statistic";
import { UsersFour, CalendarCheck, Guitar } from "@phosphor-icons/react/dist/ssr";

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
                text="Funky attendees."
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
                text="Funky afternoons & evenings."
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
                text="Local musicians & groups hosted."
                number={statistics.artists}
                color="green"
            />
        </section>
    );
}
