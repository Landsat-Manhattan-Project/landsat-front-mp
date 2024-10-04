import React, { useRef, useEffect, useState } from "react";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";

import mapboxgl, { MapMouseEvent, Map as MP } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN ?? "";

const Map = () => {
  const mapRef = useRef<MP>(null!);
  const mapContainerRef = useRef<HTMLDivElement>(null!);

  // Es un copy/paste de la página oficial, tengo pendiente arreglarlo para que este
  // para buscar por lat y lng, y por nombre.
  const coordinatesGeocoder = (query: string): Result[] => {
    const matches = query.match(
      /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    );
    if (!matches) {
      return [];
    }

    function coordinateFeature(lng: number, lat: number) {
      return {
        center: [lng, lat],
        geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        place_name: "Lat: " + lat + " Lng: " + lng,
        place_type: ["coordinate"],
        properties: {},
        type: "Feature",
      };
    }

    const coord1 = Number(matches[1]);
    const coord2 = Number(matches[2]);
    const geocodes: any[] = [];

    if (coord1 < -90 || coord1 > 90) {
      geocodes.push(coordinateFeature(coord1, coord2));
    }

    if (coord2 < -90 || coord2 > 90) {
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    if (geocodes.length === 0) {
      geocodes.push(coordinateFeature(coord1, coord2));
      geocodes.push(coordinateFeature(coord2, coord1));
    }

    return geocodes;
  };

  // Para markers
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl as any,
      }),
      "bottom-right"
    );

    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-right"
    );

    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        zoom: 4,
        placeholder: "Try: -40, 170",
        mapboxgl: mapboxgl as any,
        reverseGeocode: true,
      })
    );

    // TODO: Missing marker, implementing
    mapRef.current.on("click", (e: MapMouseEvent) => {
      e.preventDefault();

      console.log(e);

      const { lat, lng } = e.lngLat;
      setCoordinates({ lat, lng });
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div
        id="map-container"
        style={{ width: "100vw", height: "100vh", zIndex: 999 }}
        ref={mapContainerRef}
      />
    </>
  );
};

export { Map };
