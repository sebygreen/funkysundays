import { House, Smiley } from "@phosphor-icons/react/dist/ssr";
import styles from "./page.module.css";
import Button from "@/components/common/Button";

export default function Page() {
    return (
        <div className={styles.wrapper}>
            <Smiley />
            <h1>Succès!</h1>
            <h2>Merci beaucoup pour votre contribution!</h2>
            <p>Vous receverez un mail avec un résumé de votre don.</p>
            <Button type="route" color="primary" url="/" icon={<House />} />
        </div>
    );
}
