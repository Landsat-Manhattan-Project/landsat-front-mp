import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  locationName: string;
  color: string;
  lat: string;
  long: string;
  eventTime: string;
  eventDate: string;
  satellite: string;
};

const EventCard = ({
  id,
  locationName,
  color,
  lat,
  long,
  eventTime,
  eventDate,
  satellite,
}: Props) => {
  const navigate = useNavigate();

  const redirectToChat = () => {
    navigate(`${id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        maxWidth: "430px",
      }}
    >
      <CardActionArea
        onClick={redirectToChat}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: "#f9f9f9",
          color: "#000",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItem: "center",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <Box>
            <Typography variant="h5">{locationName}</Typography>
            <Typography variant="body1">Latitude: {lat}</Typography>
            <Typography variant="body1">Longitude: {long}</Typography>
          </Box>
          <Box>
            <Typography variant="body1">Time: {eventTime}</Typography>
            <Typography variant="body1">Date: {eventDate}</Typography>
            <Typography variant="body1">Satellite: {satellite}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
