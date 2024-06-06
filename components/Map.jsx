import Mapbox from "./client/Mapbox";
import styles from "@/style/Map.module.css";
import Button from "./Button";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";

export default function Map({ coordinates, location }) {
    return (
        <section className="spaced">
            <Mapbox coordinates={coordinates} />
            <div className={styles.buttons}>
                <Button
                    type="anchor"
                    href={`https://maps.apple.com/?q=${location}`}
                    icon={<ArrowSquareOut size={20} weight="fill" />}
                    text="Apple Maps"
                />
                <Button
                    type="anchor"
                    href={`https://www.google.com/maps/search/?api=1&query=${location}`}
                    icon={<ArrowSquareOut size={20} weight="fill" />}
                    text="Google Maps"
                />
            </div>
        </section>
    );
}
