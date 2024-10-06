import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Place } from "../../../entities/place";

type Props = Place;

const PlaceCard = ({ id, name, latitude, longitude, notify }: Props) => {
  const navigate = useNavigate();

  const redirectToChat = () => {
    navigate("/home", {
      state: {
        id,
        name,
        latitude,
        longitude,
        notify,
      },
    });
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "380px",
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
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <Typography variant="body1">Latitude: {latitude}</Typography>
            <Typography variant="body1">Longitude: {longitude}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlaceCard;
