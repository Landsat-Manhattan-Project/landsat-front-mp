import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { prettyPrintJson } from "pretty-print-json";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import "./style.css";

type Props = {};

const EventData = (props: Props) => {
  const baseUrl = `${process.env.REACT_APP_PYTHON_API}/metadata`;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const latitude = queryParams.get("latitude");
  const longitude = queryParams.get("longitude");

  const [jsonData, setJsonData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const images = [
    {
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  const getMetadata = async () => {
    try {
      setIsLoading(true);
      console.log(baseUrl);
      const { data } = await axios.get(
        `${baseUrl}?latitude=${latitude}&longitude=${longitude}`
      );
      setJsonData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const SceneImages = () => {
    return (
      <Box
        sx={{
          width: "80%",
          minHeight: "200px",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: " 20px",
          marginY: "40px",
        }}
      >
        {images.map((i) => (
          <img src={i.thumbnail} style={{ width: "50px", height: "50px" }} />
        ))}
      </Box>
    );
  };

  const handleDownload = () => {
    // Crear un archivo ficticio Blob
    const fileContents = "Este es un archivo de prueba ficticio";
    const blob = new Blob([fileContents], { type: "application/zip" });

    // Crear una URL para el archivo Blob
    const url = URL.createObjectURL(blob);

    // Crear un enlace <a> para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Report.zip"); // Nombre del archivo

    // Simular un clic en el enlace para descargar
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    getMetadata();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "35%",
          height: "calc(100vh - 64px)",
          backgroundColor: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "@media (max-width: 900px)": {
            width: "100%",
          },
        }}
      >
        <span className="loader"></span>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "35%",
        height: "calc(100vh - 64px)",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        overflowY: "scroll",
        "@media (max-width: 900px)": {
          width: "100%",
        },
      }}
    >
      <Box
        sx={{
          minHeight: "700px",
          backgroundColor: "#fdfdfd",
          overflow: "scroll",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{ marginTop: "30px" }}
          dangerouslySetInnerHTML={{
            __html: prettyPrintJson.toHtml(jsonData, {
              lineNumbers: true,
            }),
          }}
        />
      </Box>
      <SceneImages />
      <Button
        variant="contained"
        onClick={handleDownload}
        sx={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "20px",
          marginY: "20px",
          gap: "10px",
        }}
      >
        <DownloadIcon sx={{ color: "#000" }} />
        Download
      </Button>
    </Box>
  );
};

export default EventData;
