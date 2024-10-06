import { Box } from "@mui/material";
import React from "react";
import EventData from "../../features/ui/event_data";
import Chat from "../../features/chat";

type Props = {};

const ChatPage = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        "@media (max-width: 900px)": {
          flexDirection: "column-reverse",
        },
      }}
    >
      <EventData />
      <Chat />
    </Box>
  );
};

export default ChatPage;
