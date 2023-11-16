import Statistic from "@/components/server/Statistic";
import UpcomingEvent from "@/components/server/UpcomingEvent";
import logo from "@/images/logo.png";
import {
    CalendarCheck,
    Guitar,
    UsersFour,
} from "@phosphor-icons/react/dist/ssr";
import dayjs from "dayjs";
import Image from "next/image";
import PocketBase from "pocketbase";
import styles from "./page.module.css";

const pb = new PocketBase("http://127.0.0.1:8090");

async function fetchUpcomingEvent() {
    try {
        const record = await pb
            .collection("events")
            .getFirstListItem(`start > "${dayjs().format()}"`, {
                requestKey: "upcoming-event",
                fields: "id, name, start, end, category",
            });
        // success
        const upcomingEvent = new upcomingEventSchema(record);
        return upcomingEvent;
    } catch (err) {
        // failure
        console.log(err);
        return false;
    }
    function upcomingEventSchema(data) {
        this.id = data.id;
        this.name = data.name;
        this.start = dayjs(data.start);
        this.end = dayjs(data.end);
        this.days = this.end.diff(this.start, "day") + 1;
        this.category = data.category;
    }
}

async function fetchAttendees() {
    try {
        const records = await pb.collection("events").getFullList({
            requestKey: "statistics-attendees",
            fields: "attendees",
        });
        //success
        return Object.values(records).reduce(
            (accumulator, { attendees }) => accumulator + attendees,
            0
        );
    } catch (err) {
        //failure
        console.log(err);
        return false;
    }
}

async function fetchEventCount() {
    try {
        const records = await pb.collection("events").getList(1, 1, {
            requestKey: "statistics-events",
        });
        //success
        return records.totalItems;
    } catch (err) {
        //failure
        console.log(err);
        return false;
    }
}

async function fetchArtistCount() {
    try {
        const records = await pb.collection("artists").getList(1, 1, {
            requestKey: "statistics-artists",
        });
        //success
        return records.totalItems;
    } catch (err) {
        //failure
        console.log(err);
        return false;
    }
}

export default async function Home() {
    const upcomingEvent = await fetchUpcomingEvent();
    const attendees = await fetchAttendees();
    const eventCount = await fetchEventCount();
    const artistCount = await fetchArtistCount();
    return (
        <>
            <div className={styles.heroBackground}>
                <div className={styles.heroTexture}></div>
                <div
                    className="wrapper"
                    id="home"
                >
                    <section className={styles.hero}>
                        <Image
                            src={logo}
                            alt="Purple logo."
                        />
                        <h1>Making sundays a better day since 2019.</h1>
                    </section>
                </div>
            </div>
            <div className={`wrapper ${styles.wrapper}`}>
                {upcomingEvent ? (
                    <UpcomingEvent event={upcomingEvent} />
                ) : (
                    <p>No upcoming events for now.</p>
                )}
                <section
                    id="about"
                    className={styles.about}
                >
                    <h2>What is this?</h2>
                    <p>
                        Initialement sous le nom “Lausanne Funky Sunday”,
                        c&apos;est en septembre 2018 que l&apos;association
                        Funky Sundays voit le jour. Cette association fondée par
                        un groupe d&apos;amis, 16 anciens étudiants de
                        l&apos;EPFL avait pour but de mettre sur pied un
                        festival de musique le dimanche.
                    </p>
                </section>
                <section
                    id="statistics"
                    className={styles.statistics}
                >
                    <Statistic
                        icon={
                            <UsersFour
                                size={32}
                                color="rgb(170, 218, 247)"
                            />
                        }
                        text="Funky attendees."
                        number={attendees}
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
                        number={eventCount}
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
                        number={artistCount}
                        color="green"
                    />
                </section>
            </div>
        </>
    );
}
