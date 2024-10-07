import { Box } from "@mui/material";
import { PlaceDetails } from "../../features/place_details/ui";
import { useLocation } from "react-router-dom";

const PlaceDetailsPage = () => {
  const location = useLocation();

  return (
    <Box sx={{ p: 4 }}>
      <PlaceDetails place={location.state} />
    </Box>
  );
};

export default PlaceDetailsPage;
