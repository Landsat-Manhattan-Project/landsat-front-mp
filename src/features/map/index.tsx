import React, { useRef, useEffect, useState } from "react";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import CloseIcon from "@mui/icons-material/Close";
import mapboxgl, { MapMouseEvent, Map as MP } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { LandsatButton } from "../ui/button";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN ?? "";

const Map = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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

  const [coordinatesInfo, setCoordinatesInfo] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    mapboxgl.accessToken = TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    // mapRef.current.addControl(
    //   new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl as any,
    //   }),
    //   "bottom-right"
    // );

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

    mapRef.current.on("click", (e: MapMouseEvent) => {
      e.preventDefault();
      const { lat, lng } = e.lngLat;

      setCoordinatesInfo({ lat, lng });

      handleOpen();

      // const popup = new mapboxgl.Popup();

      // popup.setLngLat({ lat, lng });
      // popup.setHTML("<h1>Hello World!</h1>");

      // popup.addTo(mapRef.current);

      // const marker = new mapboxgl.Marker();
      // marker.setLngLat({ lat, lng });
      // marker.setPopup(new mapboxgl.Popup().setHTML("<h1>Hello World!</h1>"));
      // marker.togglePopup();
      // marker.getPopup();
      // marker.addTo(mapRef.current);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div
        id="map-container"
        style={{ width: "100vw", height: "calc(100% - 64px)" }}
        ref={mapContainerRef}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Coordinates:
              </Typography>
              <Typography variant="h6">
                {coordinatesInfo?.lat.toFixed(4)},{" "}
                {coordinatesInfo?.lng.toFixed(4)}
              </Typography>
            </Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <LandsatButton text="Save" />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export { Map };
