import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format, addDays } from "date-fns";

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
  const generateRandomDates = () => {
    const today = new Date(); // Current date
    const randomSize = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 10
    const dateList = [today]; // Start with the current date

    for (let i = 1; i < randomSize; i++) {
      // Copy the last generated date
      let previousDate = new Date(dateList[dateList.length - 1]);

      // Subtract a random number of days (between 1 and 30)
      let daysToSubtract = Math.floor(Math.random() * 30) + 1;
      previousDate.setDate(previousDate.getDate() - daysToSubtract);

      // Add the new date to the list
      dateList.push(previousDate);
    }

    return dateList;
  };

  const [value, setValue] = useState("");

  const handleChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    console.log(typeof newValue);
    if (newValue > 100) {
      setValue(newValue.slice(0, 2));
      return;
    } else if (newValue < 0) {
      setValue(newValue.slice(0));
      return;
    }

    setValue(newValue);
  };
  const redirectToChat = () => {
    navigate(`${id}`);
  };

  return (
    <Card
      sx={{
        display: "flex",
        width: "380px",
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: "#f9f9f9",
          color: "#000",
        }}
        onClick={redirectToChat}
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
          <Box
            sx={{
              width: "30%",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <select onClick={(event) => event.stopPropagation()}>
              {generateRandomDates().map((i) => (
                <option>{format(i, "dd/MM/yyyy")}</option>
              ))}
            </select>
            <Box>
              Cloud coverage:
              <input
                type="number"
                max={100}
                onClick={(event) => event.stopPropagation()}
                style={{ width: "100%" }}
                value={parseInt(value)}
                onChange={handleChange}
              ></input>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
