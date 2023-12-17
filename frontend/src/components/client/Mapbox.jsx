"use client";

import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Mapbox({ coordinates }) {
    //console.log(coordinates);
    return (
        <Map
            initialViewState={{
                longitude: coordinates.longitude,
                latitude: coordinates.latitude,
                zoom: 14,
            }}
            style={{ width: "100%", height: 320, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            reuseMaps
            cooperativeGestures
        >
            <NavigationControl />
            <Marker
                longitude={coordinates.longitude}
                latitude={coordinates.latitude}
                color="red"
            />
        </Map>
    );
}
