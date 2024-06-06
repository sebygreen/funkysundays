import Loader from "@/components/Loader";
import styles from "./loading.module.css";

export default function Loading() {
    return (
        <div className={styles.container}>
            <Loader />
        </div>
    );
}
