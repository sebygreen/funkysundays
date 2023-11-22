import Mapbox from "./client/Mapbox";
import Image from "next/image";
import appleMaps from "@/images/apple-maps.png";
import googleMaps from "@/images/google-maps.png";
import styles from "@/style/Map.module.css";
import Button from "./Button";

export default function Map({ coordinates, location }) {
    return (
        <section className={styles.container}>
            <Mapbox coordinates={coordinates} />
            <div className={styles.buttons}>
                <Button
                    type="anchor"
                    href={`http://maps.apple.com/?q=${location}`}
                    icon={
                        <Image
                            src={appleMaps}
                            alt="Apple maps icon"
                        />
                    }
                    text="Apple Maps"
                />
                <Button
                    type="anchor"
                    href={`https://www.google.com/maps/search/?api=1&query=${location}`}
                    icon={
                        <Image
                            src={googleMaps}
                            alt="Google maps icon"
                        />
                    }
                    text="Google Maps"
                />
            </div>
        </section>
    );
}
