import styles from "./page.module.css";
import Image from "next/image";
import logo from "@/images/logo.png";
import PocketBase from "pocketbase";
import dayjs from "dayjs";
import Event from "@/components/server/event";
import { Suspense } from "react";
import Loader from "@/components/server/loading";
import UpcomingEvent from "@/components/server/UpcomingEvent";

const pb = new PocketBase("http://127.0.0.1:8090");

async function fetchUpcomingEvent() {
    try {
        const record = await pb.collection("events").getFirstListItem(`start > "${dayjs().format()}"`, {
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

export default async function Home() {
    const upcomingEvent = await fetchUpcomingEvent();
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
                {upcomingEvent ? <UpcomingEvent event={upcomingEvent} /> : <p>No upcoming events for now.</p>}
                <section
                    id="about"
                    className={styles.about}
                >
                    <h2>What is this?</h2>
                    <p>
                        Initialement sous le nom “Lausanne Funky Sunday”, c&apos;est en septembre 2018 que
                        l&apos;association Funky Sundays voit le jour. Cette association fondée par un groupe
                        d&apos;amis, 16 anciens étudiants de l&apos;EPFL avait pour but de mettre sur pied un festival
                        de musique le dimanche.
                    </p>
                </section>
            </div>
        </>
    );
}
