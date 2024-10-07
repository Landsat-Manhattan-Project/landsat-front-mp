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

interface Props extends Place {}

const PlaceCard = (props: Props) => {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(`${props._id}`, {
      state: props,
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
        onClick={redirectToHome}
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
              {props.name}
            </Typography>
            <Typography variant="body1">Latitude: {props.latitude}</Typography>
            <Typography variant="body1">
              Longitude: {props.longitude}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlaceCard;
