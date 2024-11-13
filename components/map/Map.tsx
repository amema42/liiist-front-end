// components/map/Map.tsx
"use client";
import React, { useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ center, zoom, children }) => {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries: ["places"], // Adding the places library
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Maps...</div>;
    }

    return (
        <GoogleMap
            center={{ lat: center[0], lng: center[1] }}
            zoom={zoom}
            mapContainerStyle={{ width: "100%", height: "400px" }}
        >
            {children}
        </GoogleMap>
    );
};

export default Map;
