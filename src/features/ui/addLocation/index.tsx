import {
  Box,
  Button,
  Fab,
  Input,
  InputLabel,
  TextField,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { theme } from "../theme";
import { useState } from "react";

type Props = {};

const AddLocation = (props: Props) => {
  const [isFormOpen, SetIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
  });

  const getFabContent = () => {
    if (isFormOpen) {
      return (
        <>
          <AddIcon
            sx={{ mr: 1, rotate: "225deg", transition: "all ease 0.3s" }}
          />
          Add point
        </>
      );
    }
    return (
      <>
        <AddIcon sx={{ mr: 1, transition: "all ease 0.3s" }} />
        Add point
      </>
    );
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Sent data:", formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 170,
          height: 70,
          borderRadius: "25px",
        }}
        onClick={() => SetIsFormOpen(!isFormOpen)}
      >
        {getFabContent()}
      </Fab>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: isFormOpen ? 1300 : 170,
          height: 70,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.text.primary,
          borderRadius: "26px",
          transition: "all ease 0.3s",
        }}
      >
        <TextField
          label="Latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
          variant="filled"
          required
        />
        <TextField
          label="Longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
          variant="filled"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default AddLocation;
