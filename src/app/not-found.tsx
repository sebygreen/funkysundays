import styles from "@/style/layout/Error.module.css";
import { House, SmileySad } from "@phosphor-icons/react/dist/ssr";
import Button from "@/components/common/Button";

export default function NotFound() {
    return (
        <div className={styles.container}>
            <SmileySad weight="fill" />
            <p>Cette page n&apos;existe pas.</p>
            <Button type={"route"} icon={<House />} text={"Accueil"} url="/" color="primary" />
        </div>
    );
}
