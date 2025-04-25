import styles from "@/style/home/Alert.module.css";
import Button from "@/components/common/Button";
import { ArrowRight, HandHeart, Megaphone, PersonArmsSpread } from "@phosphor-icons/react/dist/ssr";
import parse from "html-react-parser";
import { AlertBase } from "@/types";

export default function Alert({ data }: { data: AlertBase }) {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div key={data.id} className={styles.alert}>
                    <div className={styles.header}>
                        {data.type === "crowdfunding" ?
                            <HandHeart weight="duotone" />
                        : data.type === "volunteers" ?
                            <PersonArmsSpread weight="duotone" />
                        :   <Megaphone weight="duotone" />}
                        <h2>{data.title}</h2>
                    </div>
                    <div className={styles.description}>{parse(data.description)}</div>
                    <Button
                        type="anchor"
                        url={data.link}
                        icon={<ArrowRight />}
                        text={
                            data.type === "crowdfunding" ? "Donations"
                            : data.type === "volunteers" ?
                                "S'inscrire"
                            :   "Visiter"
                        }
                        target="_blank"
                        color="primary"
                    />
                </div>
            </div>
        </section>
    );
}
