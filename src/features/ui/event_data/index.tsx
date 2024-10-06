import { Box, Typography } from "@mui/material";
import { prettyPrintJson } from "pretty-print-json";

type Props = {};

const EventData = (props: Props) => {
  const jsonData = {
    satellite: "Landsat 8",
    acquisition_date: "2024-10-05T12:30:00Z",
    cloud_coverage: 5.2,
    location: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    bands: {
      band_1: {
        name: "Ultra Blue",
        wavelength: "0.43 - 0.45 µm",
        data_quality: "high",
        data: [123, 145, 130, 120, 115],
      },
      band_2: {
        name: "Blue",
        wavelength: "0.45 - 0.51 µm",
        data_quality: "high",
        data: [156, 160, 155, 150, 148],
      },
      band_3: {
        name: "Green",
        wavelength: "0.53 - 0.59 µm",
        data_quality: "high",
        data: [200, 205, 198, 190, 185],
      },
      band_4: {
        name: "Red",
        wavelength: "0.64 - 0.67 µm",
        data_quality: "medium",
        data: [225, 230, 220, 215, 210],
      },
      band_5: {
        name: "Near Infrared (NIR)",
        wavelength: "0.85 - 0.88 µm",
        data_quality: "high",
        data: [300, 310, 305, 290, 285],
      },
      band_6: {
        name: "Shortwave Infrared (SWIR) 1",
        wavelength: "1.57 - 1.65 µm",
        data_quality: "medium",
        data: [150, 155, 160, 145, 140],
      },
      band_7: {
        name: "Shortwave Infrared (SWIR) 2",
        wavelength: "2.11 - 2.29 µm",
        data_quality: "high",
        data: [80, 85, 82, 78, 75],
      },
    },
    metadata: {
      image_quality: "clear",
      sensor_type: "OLI/TIRS",
      processing_level: "L1TP",
      scene_id: "LC08_L1TP_012034_20241005_20241005_01_RT",
    },
  };

  return (
    <Box
      sx={{
        width: "35%",
        height: "calc(100vh - 64px)",
        backgroundColor: "#232323",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "calc(100vh - 150px)",
          backgroundColor: "#fdfdfd",
          overflow: "scroll",
          padding: "10px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: prettyPrintJson.toHtml(jsonData, {
              lineNumbers: true,
            }),
          }}
        />
      </Box>
    </Box>
  );
};

export default EventData;
