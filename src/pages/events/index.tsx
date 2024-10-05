import React from "react";
import EventCard from "../../features/ui/event_card";
import { Box } from "@mui/material";

type Props = {};

const EventsPage = (props: Props) => {
  const events = [
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
    {
      id: "1",
      locationName: "MyPoint",
      color: "blue",
      lat: "1.42313123",
      long: "5.12312312",
      eventTime: "9:35 AM",
      eventDate: "10/12/2024",
      satellite: "Landsat 8",
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: "calc(380px * 4 + 50px * 3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        flexWrap: "wrap",
        paddingTop: "30px",
        paddingBottom: "30px",
        margin: "0 auto",
        columnGap: "50px",
        rowGap: "20px",
      }}
    >
      {events.map((i) => (
        <EventCard
          id={i.id}
          locationName={i.locationName}
          color={i.color}
          lat={i.lat}
          long={i.long}
          eventTime={i.eventTime}
          eventDate={i.eventDate}
          satellite={i.satellite}
        />
      ))}
    </Box>
  );
};

export default EventsPage;
