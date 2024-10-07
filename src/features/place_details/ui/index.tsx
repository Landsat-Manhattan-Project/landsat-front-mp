import { useState } from "react";
import { Accordion } from "../../ui/accordion";
import { Box, Typography } from "@mui/material";
import { usePlaceDetails } from "../model/use_place_details";
import { Place } from "../../../entities/place";
import { images } from "../../../assets/images";

import scene1 from "../../ui/event_data/images/B1_sabana.webp";
import scene2 from "../../ui/event_data/images/B2_sabana.webp";
import scene3 from "../../ui/event_data/images/B3_sabana.webp";
import scene4 from "../../ui/event_data/images/B4_sabana.webp";
import scene5 from "../../ui/event_data/images/B5_sabana.webp";
import scene6 from "../../ui/event_data/images/B6_sabana.webp";
import scene7 from "../../ui/event_data/images/B7_sabana.webp";

interface Props {
  place: Place;
}

const PlaceDetails = ({ place }: Props) => {
  const [expanded, setExpanded] = useState<string | false>();
  const scenes = [scene1, scene2, scene3, scene4, scene5, scene6, scene7];

  const { history } = usePlaceDetails(place);

  return (
    <>
      <Typography variant={"h2"}>Details</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignContent: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Coordinates:
        </Typography>
        <Typography variant="h6">
          {place.latitude.toFixed(4)}, {place.longitude.toFixed(4)}
        </Typography>
      </Box>
      {history.length === 0 ? (
        <Typography variant={"body1"}>
          There are no history registered
        </Typography>
      ) : (
        history.map((place, index) => {
          const name = `${index}-${place.scene_id}_${place.acquisition_date}`;
          const placeMetadata = place;
          return (
            <Accordion
              expandedName={name}
              isExpanded={expanded === name}
              handleChange={(panel: string) =>
                (_: React.SyntheticEvent, newExpanded: boolean) =>
                  setExpanded(newExpanded ? panel : false)
                }
              summary={
                <>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {`${index}-${place.scene_id}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontStyle: "italic", fontWeight: "bold" }}
                  >
                    {Intl.DateTimeFormat("en").format(
                      new Date(place.acquisition_date)
                    )}
                  </Typography>
                </>
              }
              details={
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt={"scene"}
                        src={scenes[Math.floor(Math.random() * 6)]}
                        style={{ width: "200px", height: "200px" }}
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        Scene
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt={"graph"}
                        src={images[Math.floor(Math.random() * 5)]}
                        style={{ width: "180px", height: "180px" }}
                      />
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {"SR data"}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Cloud coverage:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.cloud_coverage}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Cloud Mask:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.cloud_mask}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Distance KM:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.distance_km}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Ground sampling distance:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.ground_sampling_distance}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Image quality:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.image_quality}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Orbit number:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.orbit_number}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Processing level:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.processing_level}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Projection:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.projection}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Satellite:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.satellite}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Sensor type:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.sensor_type}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Typography
                      id="modal-modal-description"
                      sx={{ fontWeight: "bold" }}
                    >
                      Scene ID:
                    </Typography>
                    <Typography id="modal-modal-description">
                      {placeMetadata?.scene_id}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Sun azimuth:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.sun_azimuth}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        Sun elevation:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.sun_elevation}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        WRS path:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.wrs_path}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        mt: 2,
                      }}
                    >
                      <Typography
                        id="modal-modal-description"
                        sx={{ fontWeight: "bold" }}
                      >
                        WRS row:
                      </Typography>
                      <Typography id="modal-modal-description">
                        {placeMetadata?.wrs_row}
                      </Typography>
                    </Box>
                  </Box>
                </>
              }
            />
          );
        })
      )}
    </>
  );
};

export { PlaceDetails };
