import { Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { theme } from "../ui/theme";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Markdown from "react-markdown";
import "./style.css";

type Props = {};

const Chat = (props: Props) => {
  const baseUrl = `${process.env.REACT_APP_PYTHON_API}/evaluate-data`;

  const request = useRef<any>("");
  const { search } = useLocation();
  const [messages, setMessages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const queryParams = new URLSearchParams(search);

  const latitude = queryParams.get("latitude");
  const longitude = queryParams.get("longitude");

  const handleSubmit = async (e: any) => {
    addMessage("user", request.current.value);
    await evaluateData();
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
          <Markdown>{message}</Markdown>
        </Box>
      </Box>
    );
  };

  const Messages = () => {
    if (messages.length === 0) {
      return null;
    }
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
        {messages.map((i: any) => (
          <MessageCard message={i.message} type={i.type} />
        ))}
        {isLoading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingY: "40px",
            }}
          >
            <LoadingBox />
          </Box>
        ) : null}
      </Box>
    );
  };

  const addMessage = (type: string, message: string) => {
    const newMessage = {
      message,
      type,
    };
    console.log(messages);
    setMessages((prevMessages: any) => [...prevMessages, newMessage]);
  };

  const evaluateData = async () => {
    try {
      setIsLoading(true);
      const { data }: any = await axios.post(baseUrl, {
        latitude,
        longitude,
        context: request.current.value,
        role: "farmer",
      });
      addMessage("chat", data["user_friendly_response"]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const LoadingBox = () => {
    return <span className="loader"></span>;
  };

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
