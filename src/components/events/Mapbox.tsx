"use client";

import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { GeoPoint } from "@/types";

export default function Mapbox({ coordinates }: { coordinates: GeoPoint }) {
    return (
        <Map
            initialViewState={{
                longitude: coordinates.lon,
                latitude: coordinates.lat,
                zoom: 13,
            }}
            style={{ width: "100%", height: 320, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            reuseMaps
            cooperativeGestures
        >
            <NavigationControl />
            <Marker longitude={coordinates.lon} latitude={coordinates.lat} color="red" />
        </Map>
    );
}
