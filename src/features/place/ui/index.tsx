import { Box, Typography } from "@mui/material";
import { usePlace } from "../model/use_place";
import PlaceCard from "../../ui/place_card";

const Place = () => {
  const { places } = usePlace();

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          My saved places
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "space-around",
          }}
        >
          {places ? (
            places.map((place) => (
              <PlaceCard
                key={place.id}
                id={place.id}
                name={place.name}
                latitude={place.latitude}
                longitude={place.longitude}
                notify={place.notify}
              />
            ))
          ) : (
            <Typography variant="body1" sx={{ fontStyle: "italic" }}>
              There are no saved places.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export { Place };
