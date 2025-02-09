"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  name: string;
  address: string;
}

export default function Map({ center, name, address }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { Marker } = await loader.importLibrary("marker");

      const map = new Map(mapRef.current!, {
        center,
        zoom: 15,
        mapId: "event-map",
        disableDefaultUI: true,
        zoomControl: true,
      });

      new Marker({
        map,
        position: center,
        title: name,
      });
    };

    initMap();
  }, [center, name]);

  return <div ref={mapRef} className="w-full h-full" />;
}
