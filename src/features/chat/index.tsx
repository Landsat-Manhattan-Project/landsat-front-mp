import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef } from "react";
import { theme } from "../ui/theme";

type Props = {};

const Chat = (props: Props) => {
  const request = useRef<any>("");

  const messagesList = [
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
    {
      id: "id1",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "user",
    },
    {
      id: "id3123122",
      message:
        "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ",
      type: "chat",
    },
  ];

  const handleSubmit = (e: any) => {
    console.log("Sent data:", request.current.value);
    request.current.value = "";
  };

  const ChatInput = () => {
    return (
      <Box
        sx={{
          width: "80%",
          height: "30px",
          backgroundColor: "#D7D7D7",
          borderRadius: "30px",
          display: "flex",
          justifyContent: "space-between",
          paddingX: "20px",
          paddingY: "10px",
          position: "absolute",
        }}
      >
        <input
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            height: "30px",
            width: "90%",
            fontSize: "18px",
            color: "#505050",
          }}
          ref={request}
        />
        <Button onClick={handleSubmit}>
          <SendIcon sx={{ color: "#505050" }} />
        </Button>
      </Box>
    );
  };

  const MessageCard = ({ id, message, type }: any) => {
    return (
      <Box
        id={id}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: type === "user" ? "flex-end" : "flex-start",
          marginY: "20px",
        }}
      >
        <Box
          sx={{
            width: "60%",
            backgroundColor: type === "user" ? "#000" : "#fff",
            color: type === "user" ? "#fff" : "#000",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {message}
        </Box>
      </Box>
    );
  };

  const Messages = () => {
    return (
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 64px)",
          paddingX: "10%",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          boxSizing: "border-box",
          paddingBottom: "100px",
        }}
      >
        {messagesList.map((i) => (
          <MessageCard id={i.id} message={i.message} type={i.type} />
        ))}
      </Box>
    );
  };

  useEffect(() => {
    document
      .querySelector(`#${messagesList[messagesList.length - 1].id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <Box
      sx={{
        width: "65%",
        height: "calc(100vh - 64px)",
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: "40px",
        boxSizing: "border-box",
        position: "relative",
        "@media (max-width: 900px)": {
          width: "100%",
        },
      }}
    >
      <Messages />
      <ChatInput />
    </Box>
  );
};

export default Chat;
