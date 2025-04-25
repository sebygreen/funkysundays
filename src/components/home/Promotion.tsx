import styles from "@/style/home/Promotion.module.css";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Event from "@/components/common/Event";
import { EventBase } from "@/types";
import Button from "@/components/common/Button";

export default function Promotion({ data }: { data: EventBase[] }) {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <h2>Soirées de Promotion</h2>
                {data.length > 0 ?
                    <div className="grid">
                        {data.map((i) => (
                            <Event key={i.id} data={i} />
                        ))}
                    </div>
                :   <div className={styles.empty}>
                        <p>
                            Pas d&apos;évènements à venir pour l&apos;instant.
                            <br />
                            Suivez-nous pour être informé.
                        </p>
                        <div className={styles.actions}>
                            <Button
                                type="anchor"
                                color="instagram"
                                icon={<InstagramLogo />}
                                url="https://instagram.com/funkysundays/"
                                target="_blank"
                            />
                            <Button
                                type="anchor"
                                url="https://facebook.com/funkysundays8"
                                target="_blank"
                                color="facebook"
                                icon={<FacebookLogo />}
                            />
                        </div>
                    </div>
                }
            </div>
        </section>
    );
}
