"use client";

import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Mapbox({ coordinates }: { coordinates: [number, number] }) {
    return (
        <Map
            initialViewState={{
                longitude: coordinates[0],
                latitude: coordinates[1],
                zoom: 13,
            }}
            style={{ width: "100%", height: 320, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            reuseMaps
            cooperativeGestures
        >
            <NavigationControl />
            <Marker longitude={coordinates[0]} latitude={coordinates[1]} color="red" />
        </Map>
    );
}
