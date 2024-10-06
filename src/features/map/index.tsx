import React, { useRef, useEffect, useState } from "react";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import CloseIcon from "@mui/icons-material/Close";
import mapboxgl, { MapMouseEvent, Map as MP } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { Box, Divider, IconButton, Modal, Typography } from "@mui/material";
import { Room, Save } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "../ui/input";
import { UseMap } from "./model/use_map";
import { Place } from "../../entities/place";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN ?? "";

const Map = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#000000",
    color: "white",
    border: "2px solid white",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };
  const mapRef = useRef<MP>(null!);
  const mapContainerRef = useRef<HTMLDivElement>(null!);

  const coordinatesGeocoder = (query: string): Result[] => {
    const matches = query.match(
      /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
    );
    if (!matches) {
      return [];
    }

    const placesSavedSearched = places?.filter((el) => {
      return el.name.includes(query);
    });

    const converted = placesSavedSearched?.map((el) => {
      return {
        center: [el.longitude, el.latitude],
        geometry: {
          type: "Point",
          coordinates: [el.longitude, el.latitude],
        },
        place_name: el.name,
        place_type: ["place"],
        properties: {},
        type: "Feature",
      };
    });

    console.log("BOR =================");
    console.log(placesSavedSearched);
    console.log(converted);

    // if (placesSavedSearched) {
    //   return []
    // }

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

    geocodes.push(converted);

    return geocodes;
  };

  const [coordinatesInfo, setCoordinatesInfo] = useState<{
    lat: number;
    lng: number;
    name?: string;
  } | null>(null);

  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleModalOpen = (lat: number, lng: number, name?: string) => {
    setCoordinatesInfo({
      lat,
      lng,
      name,
    });
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setCoordinatesInfo(null);
    setIsModalOpen(false);
  };

  const { places, formData, setFormData, savePlace } = UseMap(handleModalClose);

  useEffect(() => {
    mapboxgl.accessToken = TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    mapRef.current.on("click", (e: MapMouseEvent) => {
      e.preventDefault();
      const { lat, lng } = e.lngLat;

      handleModalOpen(lat, lng);

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

    let feats: {
      type: string;
      properties: {
        name: string;
        imageId: number;
        iconSize: number[];
      };
      geometry: {
        type: string;
        coordinates: number[];
      };
    }[] = [];

    if (places) {
      const features = places.map((val: Place) => {
        return {
          type: "Feature",
          properties: {
            name: val.name,
            imageId: 1011,
            iconSize: [80, 80],
          },
          geometry: {
            type: "Point",
            coordinates: [val.longitude, val.latitude],
          },
        };
      });

      feats = features;

      const geojson = {
        type: "FeatureCollection",
        features: features,
      };

      for (const marker of geojson.features) {
        const el = document.createElement("div");
        const width = marker.properties.iconSize[0];
        el.className = "marker";
        el.style.width = `${width}px`;
        el.style.zIndex = "100";
        el.style.backgroundSize = "100%";
        el.style.display = "block";
        el.style.cursor = "pointer";
        el.style.borderRadius = "40%";
        el.style.padding = "30px";

        const svg = `
        <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <g> 
          <path d="M50,10.417c-15.581,0-28.201,12.627-28.201,28.201c0,6.327,2.083,12.168,5.602,16.873L45.49,86.823 c0.105,0.202,0.21,0.403,0.339,0.588l0.04,0.069l0.011-0.006c0.924,1.278,2.411,2.111,4.135,2.111c1.556,0,2.912-0.708,3.845-1.799 l0.047,0.027l0.179-0.31c0.264-0.356,0.498-0.736,0.667-1.155L72.475,55.65c3.592-4.733,5.726-10.632,5.726-17.032 C78.201,23.044,65.581,10.417,50,10.417z M49.721,52.915c-7.677,0-13.895-6.221-13.895-13.895c0-7.673,6.218-13.895,13.895-13.895 s13.895,6.222,13.895,13.895C63.616,46.693,57.398,52.915,49.721,52.915z">
          </path> 
          </g></g>
          </svg>`;

        el.innerHTML = svg;

        const texto = document.createElement("h2");
        texto.textContent = marker.properties.name;
        texto.style.padding = "0px";
        texto.style.margin = "0px";
        texto.style.textAlign = "center";
        texto.style.textDecoration = "underline 3px";

        el.appendChild(texto);

        el.addEventListener("click", (e) => {
          const [lng, lat] = marker.geometry.coordinates;

          handleModalOpen(lat, lng, marker.properties.name);
          e.stopPropagation();
        });

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates as any)
          .addTo(mapRef.current);
      }
    }
    const forwardGeocoder = (query: string): Result[] => {
      const matchingFeatures: Result[] = [];
      for (const feature of feats) {
        if (
          feature.properties.name.toLowerCase().includes(query.toLowerCase())
        ) {
          const result: any = {
            center: feature.geometry.coordinates,
            geometry: {
              type: "Point",
              coordinates: feature.geometry.coordinates,
            },
            text: "Saved location",
            address: "Saved location",
            place_name: feature.properties.name,
            place_type: ["coordinate"],
            properties: {},
            type: "Feature",
            context: ["Saved location"],
          };

          matchingFeatures.push(result);
        }
      }
      return matchingFeatures;
    };

    const coordinatesGeocoder = (query: string): Result[] => {
      const matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );

      console.log("query");
      console.log(query);
      if (!matches) {
        return [];
      }

      const placesSavedSearched = places?.filter((el) => {
        console.log("Element: ", el);
        return el.name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
      });

      const converted = placesSavedSearched?.map((el) => {
        return {
          center: [el.longitude, el.latitude],
          geometry: {
            type: "Point",
            coordinates: [el.longitude, el.latitude],
          },
          place_name: el.name,
          place_type: ["place"],
          properties: {},
          type: "Feature",
        };
      });

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

      geocodes.push(converted);

      return geocodes;
    };

    mapRef.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: forwardGeocoder,
        zoom: 4,
        placeholder: "Try: -40, 170",
        mapboxgl: mapboxgl as any,
        reverseGeocode: true,
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

    return () => {
      mapRef.current.remove();
    };
  }, [places]);

  return (
    <>
      <div
        id="map-container"
        style={{ width: "100vw", height: "calc(100% - 64px)" }}
        ref={mapContainerRef}
      />
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
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
              onClick={handleModalClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ color: "white", bgcolor: "white", mb: 2 }} />
          {coordinatesInfo?.name && (
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {coordinatesInfo.name}
            </Typography>
          )}
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          {(coordinatesInfo?.name === null ||
            coordinatesInfo?.name === undefined) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={() => {
                  setIsFormOpen(!isFormOpen);
                  setFormData({
                    latitude: coordinatesInfo?.lat ?? 0,
                    longitude: coordinatesInfo?.lng ?? 0,
                    name: "",
                    notify: false,
                  });
                }}
                sx={{
                  m: 3,
                  "&:hover": {
                    bgcolor: "rgba(0, 0, 0, .1)",
                  },
                  borderRadius: 2,
                  transition: "all ease 0.3s",
                  bgcolor: "white",
                }}
              >
                <AddIcon
                  sx={{
                    rotate: isFormOpen ? "225deg" : null,
                    "&:hover": {
                      color: "white",
                    },
                    borderRadius: 2,
                    transition: "all ease 0.3s",
                    color: "black",
                  }}
                />
              </IconButton>
            </Box>
          )}
          {isFormOpen && (
            <>
              <Divider sx={{ color: "white", bgcolor: "white", mb: 2 }} />
              <Box
                component="form"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "26px",
                  transition: "all ease 0.3s",
                }}
              >
                <Input
                  value={formData?.name}
                  onChange={(e) => {
                    const toSave: Omit<Place, "id"> = {
                      name: e.target.value,
                      latitude: coordinatesInfo?.lat ?? 0,
                      longitude: coordinatesInfo?.lng ?? 0,
                      notify: formData?.notify ?? false,
                    };
                    setFormData(toSave);
                  }}
                  error={formData?.name === ""}
                  isRequired
                  label={"Place name"}
                  type={"text"}
                  icon={<Room sx={{ color: "white", mr: 1, my: 0.5 }} />}
                  errorLabel={"Place name is required"}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton
                  onClick={savePlace}
                  sx={{
                    m: 3,
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, .1)",
                    },
                    borderRadius: 2,
                    transition: "all ease 0.3s",
                    bgcolor: "white",
                  }}
                >
                  <Save />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export { Map };
